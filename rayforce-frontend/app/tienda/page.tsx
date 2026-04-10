import { getProducts, getCategories, searchProducts, getProductsByCategory } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda — Rayforce Material Eléctrico',
  description: 'Catálogo completo de material eléctrico, herramientas y ferretería. Encuentra todo lo que necesitas para tus proyectos.',
};

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string; orderby?: string }>;
}

export default async function TiendaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const categoryId = params.category ? parseInt(params.category) : null;
  const page = parseInt(params.page || '1');
  const orderby = params.orderby || 'date';

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    categories = await getCategories();

    if (query) {
      products = await searchProducts(query, page);
    } else if (categoryId) {
      products = await getProductsByCategory(categoryId, page);
    } else {
      products = await getProducts({ per_page: 20, page, orderby, order: 'desc' });
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }

  const activeCategory = categories.find(c => c.id === categoryId);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-header-title">
          {query ? `Resultados para "${query}"` : activeCategory ? activeCategory.name : 'Tienda en Línea'}
        </h1>
        <p className="page-header-subtitle">
          {query
            ? `${products.length} productos encontrados`
            : 'Explora nuestro catálogo completo de productos'}
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="shop-layout">
            {/* Sidebar - Filters */}
            <aside className="shop-sidebar">
              {/* Categories */}
              <div className="filter-group">
                <div className="filter-title">Categorías</div>
                <div className="filter-options">
                  <Link
                    href="/tienda"
                    className="filter-option"
                    style={{
                      fontWeight: !categoryId ? 700 : 400,
                      color: !categoryId ? 'var(--color-accent)' : undefined,
                    }}
                  >
                    Todos los productos
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/tienda?category=${cat.id}`}
                      className="filter-option"
                      style={{
                        fontWeight: categoryId === cat.id ? 700 : 400,
                        color: categoryId === cat.id ? 'var(--color-accent)' : undefined,
                      }}
                    >
                      {cat.name} ({cat.count})
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <div className="filter-title">Ordenar por</div>
                <div className="filter-options">
                  <Link href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}orderby=date`} className="filter-option">
                    Más recientes
                  </Link>
                  <Link href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}orderby=price`} className="filter-option">
                    Precio: Menor a Mayor
                  </Link>
                  <Link href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}orderby=title`} className="filter-option">
                    Nombre: A - Z
                  </Link>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div>
              <div className="shop-toolbar">
                <span className="shop-results-count">
                  Mostrando {products.length} productos
                  {activeCategory && ` en ${activeCategory.name}`}
                </span>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <div className="empty-state-title">No se encontraron productos</div>
                  <div className="empty-state-text">
                    {query
                      ? `No hay resultados para "${query}". Intenta con otro término.`
                      : 'No hay productos disponibles en esta categoría.'}
                  </div>
                  <Link href="/tienda" className="btn btn-primary">
                    Ver todos los productos
                  </Link>
                </div>
              )}

              {/* Pagination */}
              {products.length >= 20 && (
                <div className="pagination">
                  {page > 1 && (
                    <Link
                      href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}${query ? `q=${query}&` : ''}page=${page - 1}`}
                      className="pagination-btn"
                    >
                      ←
                    </Link>
                  )}
                  <span className="pagination-btn active">{page}</span>
                  <Link
                    href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}${query ? `q=${query}&` : ''}page=${page + 1}`}
                    className="pagination-btn"
                  >
                    →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
