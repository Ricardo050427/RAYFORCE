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
      title: `${product.name} | Rayforce Engineering`,
      description: product.short_description?.replace(/<[^>]*>/g, '') || product.name,
    };
  } catch {
    return { title: 'Producto No Encontrado | Rayforce' };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product: any;
  let related: any[] = [];

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
      <main className="pt-32 pb-24 max-w-[1440px] mx-auto px-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <span className="material-symbols-outlined text-outline-variant text-6xl">inventory_2</span>
          <h1 className="text-3xl font-extrabold tracking-tighter">Producto no encontrado</h1>
          <p className="text-outline max-w-sm mx-auto">El componente técnico que buscas no está disponible o ha sido renovado en nuestro catálogo.</p>
          <Link href="/tienda" className="inline-block bg-primary text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest text-xs">
            Volver a la Tienda
          </Link>
        </div>
      </main>
    );
  }

  const price = product.price || product.regular_price || '0';
  const hasStock = product.stock_status === 'instock';
  const description = product.description?.replace(/<[^>]*>/g, '') || '';

  return (
    <main className="pt-32 pb-24 max-w-[1440px] mx-auto px-8 animate-in fade-in duration-700">
      {/* Product Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
        {/* Left: Product Visualization */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 flex items-center justify-center min-h-[500px] md:min-h-[600px] border border-outline-variant/10">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Right: Product Information */}
        <div className="lg:col-span-5 flex flex-col pt-4">
          <span className="font-label text-[10px] tracking-[0.2em] uppercase text-primary font-bold mb-4">
            {product.categories?.[0]?.name || 'Ingeniería Rayforce'} / Componentes
          </span>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[1.1]">
            {product.name}
          </h1>
          
          <div className="flex items-baseline space-x-4 mb-8">
            <span className="text-4xl font-headline font-bold text-primary">
              {parseFloat(price) > 0 ? formatPrice(price) : 'Bajo pedido'}
            </span>
            <span className="font-label text-xs text-outline uppercase tracking-widest">
              SKU: {product.sku || 'N/A'}
            </span>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 font-body">
            {product.short_description?.replace(/<[^>]*>/g, '') || description.substring(0, 160) + '...'}
          </p>

          <div className="space-y-4 mb-12">
            <AddToCartButton product={product} />
            <a
              href={`https://wa.me/526622151020?text=${encodeURIComponent(`Hola, solicito información técnica del producto: ${product.name} (SKU: ${product.sku})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-surface-container-high border border-outline-variant/20 text-on-surface py-5 px-8 font-headline font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-surface-variant transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Solicitar Cotización de Volumen
            </a>
          </div>

          {/* Quick Technical Highlights Mockup */}
          <div className="grid grid-cols-2 gap-px bg-outline-variant/10 border border-outline-variant/10">
            <div className="bg-surface p-4">
              <span className="font-label text-[9px] uppercase tracking-widest text-outline block mb-1">Disponibilidad</span>
              <span className={`font-headline font-bold text-xs uppercase ${hasStock ? 'text-success' : 'text-error'}`}>
                {hasStock ? 'En Stock' : 'Agotado'}
              </span>
            </div>
            <div className="bg-surface p-4">
              <span className="font-label text-[9px] uppercase tracking-widest text-outline block mb-1">Garantía Atellier</span>
              <span className="font-headline font-bold text-on-surface text-xs uppercase">5 Años Industrial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter mb-2 uppercase">Especificaciones Técnicas</h2>
            <div className="h-1 w-12 bg-primary"></div>
          </div>
          <div className="text-outline font-label text-[10px] uppercase tracking-[0.2em]">Referencia de Ingeniería: {product.sku || 'N/A'}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 border-t border-outline-variant/10 pt-12">
          {description && (
            <div className="md:col-span-2 prose prose-sm max-w-none text-on-surface-variant font-body leading-relaxed mb-8">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}
          
          {product.attributes?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:col-span-2">
              {product.attributes.map((attr: any, i: number) => (
                <div key={i} className="space-y-4">
                  <span className="font-label text-[10px] uppercase text-primary font-extrabold tracking-widest block mb-2">{attr.name}</span>
                  <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface font-semibold text-sm">{attr.options.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-outline text-xs italic">Consulte el catálogo técnico para más detalles sobre este componente.</p>
          )}
        </div>
      </section>

      {/* Related Items Section */}
      {related.length > 0 && (
        <section>
          <div className="mb-12">
            <h3 className="font-headline text-2xl font-extrabold tracking-tighter uppercase mb-8">Completa tu Sistema</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <Link href={`/tienda/${p.slug}`}>
                    <div className="bg-surface-container p-8 mb-4 flex items-center justify-center aspect-square transition-all group-hover:bg-surface-container-highest border border-outline-variant/5">
                      {p.images?.[0]?.src ? (
                        <img 
                          src={p.images[0].src} 
                          alt={p.name} 
                          className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="text-4xl text-outline-variant">📦</div>
                      )}
                    </div>
                  </Link>
                  <h4 className="font-headline font-bold text-on-surface uppercase text-xs tracking-tight mb-1">{p.name}</h4>
                  <p className="font-label text-[10px] text-outline tracking-widest mb-3">{formatPrice(p.price || p.regular_price)}</p>
                  <Link 
                    href={`/tienda/${p.slug}`}
                    className="text-primary font-headline font-bold uppercase text-[9px] tracking-[0.2em] border-b border-transparent hover:border-primary pb-1 transition-all"
                  >
                    Ver Componente
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
