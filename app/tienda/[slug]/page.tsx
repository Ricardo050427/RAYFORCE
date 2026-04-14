import { getProduct, getProducts, formatPrice } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return {
      title: `${product.name} — Rayforce`,
      description: product.short_description?.replace(/<[^>]*>/g, '') || product.name,
    };
  } catch {
    return { title: 'Producto — Rayforce' };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product: Awaited<ReturnType<typeof getProduct>>;
  let related: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    product = await getProduct(slug);
    if (product.categories?.[0]?.id) {
      related = await getProducts({
        category: product.categories[0].id,
        per_page: 4,
        exclude: product.id,
      });
    }
  } catch {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <div className="empty-state-title">Producto no encontrado</div>
          <div className="empty-state-text">El producto que buscas no existe o fue eliminado.</div>
          <Link href="/tienda" className="btn btn-primary">Volver a la Tienda</Link>
        </div>
      </div>
    );
  }

  const price = product.price || product.regular_price || '0';
  const hasStock = product.stock_status === 'instock';
  const description = product.description?.replace(/<[^>]*>/g, '') || '';

  return (
    <>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/tienda">Tienda</Link>
          {product.categories?.[0] && (
            <>
              <span className="breadcrumb-separator">/</span>
              <Link href={`/tienda?category=${product.categories[0].id}`}>
                {product.categories[0].name}
              </Link>
            </>
          )}
          <span className="breadcrumb-separator">/</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="product-detail">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Info */}
          <div className="product-info">
            <div className="product-info-sku">SKU: {product.sku || 'N/A'}</div>
            <h1 className="product-info-name">{product.name}</h1>

            {parseFloat(price) > 0 ? (
              <div className="product-info-price">
                {formatPrice(price)}
                <span className="currency"> MXN</span>
              </div>
            ) : (
              <div className="product-info-price" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)' }}>
                Solicitar precio
              </div>
            )}

            <span className={`product-info-stock ${hasStock ? 'stock-available' : 'stock-unavailable'}`}>
              {hasStock ? '● En existencia' : '○ Agotado'}
            </span>

            {description && (
              <div className="product-info-description">{description}</div>
            )}

            {/* Attributes */}
            {product.attributes?.length > 0 && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                {product.attributes.map((attr, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 'var(--space-2) 0',
                    borderBottom: '1px solid var(--color-border-light)',
                    fontSize: 'var(--font-size-sm)',
                  }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{attr.name}</span>
                    <span style={{ fontWeight: 600 }}>{attr.options.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* WhatsApp */}
            <a
              href={`https://wa.me/526622151020?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name} (SKU: ${product.sku})`)}`}
              className="btn btn-outline"
              style={{ width: '100%', marginTop: 'var(--space-3)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Productos Relacionados</h2>
            </div>
            <div className="grid grid-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
