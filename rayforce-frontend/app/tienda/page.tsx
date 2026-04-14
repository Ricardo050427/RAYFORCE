import { getProducts, getCategories, searchProducts, getProductsByCategory } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Suministros Industriales | Rayforce Technical Atelier',
  description: 'Explora nuestro catálogo de componentes eléctricos, herramientas de precisión y suministros industriales de alta gama.',
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

  let products: any[] = [];
  let categories: any[] = [];

  try {
    categories = await getCategories();

    if (query) {
      products = await searchProducts(query, page);
    } else if (categoryId) {
      products = await getProductsByCategory(categoryId, page);
    } else {
      products = await getProducts({ per_page: 24, page, orderby, order: 'desc' });
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }

  const activeCategory = categories.find(c => c.id === categoryId);

  return (
    <main className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto animate-in fade-in duration-700">
      {/* Breadcrumb & Title */}
      <header className="mb-20">
        <nav className="mb-6 flex gap-3 text-[10px] uppercase tracking-[0.2em] font-label text-outline font-bold">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/tienda" className="hover:text-primary transition-colors">Catálogo Técnico</Link>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-on-surface">{activeCategory.name}</span>
            </>
          )}
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-3xl leading-[0.95] text-on-surface">
            {query ? `Resultados: ${query}` : activeCategory ? activeCategory.name : 'Componentes &'}
            {!query && !activeCategory && <br />}
            {!query && !activeCategory && <span className="text-primary italic font-light drop-shadow-sm">Herramientas Pro</span>}
          </h1>
          <p className="font-label text-xs text-outline max-w-xs leading-relaxed uppercase tracking-[0.1em] font-semibold border-l border-primary/20 pl-6">
            Ingeniería de precisión y suministros de alta exigencia para infraestructura industrial.
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-12">
            {/* Filter Group: Category */}
            <section>
              <h3 className="font-label text-[11px] font-extrabold uppercase tracking-[0.2em] mb-8 text-on-surface border-b border-outline-variant/15 pb-2">
                Especialidades
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/tienda" 
                    className={`text-[11px] uppercase tracking-widest font-bold flex justify-between items-center transition-all ${!categoryId ? 'text-primary' : 'text-outline hover:text-on-surface'}`}
                  >
                    Ver Todo
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/tienda?category=${cat.id}`}
                      className={`text-[11px] uppercase tracking-widest font-bold flex justify-between items-center transition-all ${categoryId === cat.id ? 'text-primary' : 'text-outline hover:text-on-surface'}`}
                    >
                      {cat.name}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-sm ${categoryId === cat.id ? 'bg-primary text-white' : 'bg-surface-container text-outline'}`}>
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Filter Group: Sort */}
            <section>
              <h3 className="font-label text-[11px] font-extrabold uppercase tracking-[0.2em] mb-8 text-on-surface border-b border-outline-variant/15 pb-2">
                Sincronización
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'date', label: 'Más Recientes' },
                  { id: 'price', label: 'Menor Precio' },
                  { id: 'title', label: 'Nombre A-Z' }
                ].map((sort) => (
                  <Link 
                    key={sort.id}
                    href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}${query ? `q=${query}&` : ''}orderby=${sort.id}`}
                    className={`text-[10px] uppercase tracking-widest font-bold px-4 py-3 border transition-all ${orderby === sort.id ? 'border-primary text-primary bg-primary/5' : 'border-outline-variant/20 text-outline hover:border-outline'}`}
                  >
                    {sort.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-6 bg-surface-container-low border border-dashed border-outline-variant/30 rounded-lg">
              <span className="material-symbols-outlined text-outline text-5xl">search_off</span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Sin coincidencias técnicas</h3>
                <p className="text-outline text-xs uppercase tracking-widest">
                  No encontramos componentes para &quot;{query || 'esta categoría'}&quot; en el catálogo actual.
                </p>
              </div>
              <Link href="/tienda" className="inline-block bg-primary text-white px-8 py-4 rounded-md text-[10px] font-bold uppercase tracking-widest">
                Reiniciar Filtros
              </Link>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-24 flex items-center justify-center gap-6 border-t border-outline-variant/10 pt-12">
            {page > 1 && (
              <Link
                href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}${query ? `q=${query}&` : ''}page=${page - 1}`}
                className="w-12 h-12 flex items-center justify-center border border-outline-variant/20 hover:border-primary text-outline hover:text-primary transition-all rounded-sm"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </Link>
            )}
            
            <span className="font-label text-[11px] font-black tracking-[0.3em] text-on-surface uppercase">
              Página <span className="text-primary">{page}</span>
            </span>
            
            {products.length >= 20 && (
              <Link
                href={`/tienda?${categoryId ? `category=${categoryId}&` : ''}${query ? `q=${query}&` : ''}page=${page + 1}`}
                className="w-12 h-12 flex items-center justify-center border border-outline-variant/20 hover:border-primary text-on-surface hover:text-primary transition-all rounded-sm"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
