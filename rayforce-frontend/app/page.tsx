import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

// Category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
  'material-electrico': '⚡',
  'herramientas': '🔧',
  'iluminacion': '💡',
  'tuberia-y-conduit': '🔩',
  'interruptores-y-tableros': '🔌',
  'accesorios-y-fijacion': '📎',
  'ferreteria-general': '🏗️',
};

// Brand names
const BRANDS = [
  'TRUPER', 'TRUPER EXPERT', 'PRETUL', 'FIERO',
  'Square D', 'Schneider Electric', 'Volteck', 'Surtek',
];

export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getProducts>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    [featuredProducts, categories] = await Promise.all([
      getProducts({ per_page: 8, orderby: 'date', order: 'desc' }),
      getCategories(),
    ]);
  } catch (error) {
    console.error('Error loading home data:', error);
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">🏪 Tienda en Línea</span>
            <h1 className="hero-title">
              Material Eléctrico y <span className="accent">Ferretería</span> de Calidad
            </h1>
            <p className="hero-description">
              Encuentra todo lo que necesitas para tus proyectos eléctricos,
              de construcción y mantenimiento. Más de 2,000 productos de marcas
              líderes con envío a todo Sonora.
            </p>
            <div className="hero-buttons">
              <Link href="/tienda" className="btn btn-primary btn-lg">
                Comprar Ahora
              </Link>
              <Link href="/cotizar" className="btn btn-ghost btn-lg">
                Cotizar Proyecto
              </Link>
              <Link href="/servicios" className="btn btn-ghost btn-lg">
                Ver Servicios
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">2,200+</div>
                <div className="hero-stat-label">Productos</div>
              </div>
              <div>
                <div className="hero-stat-value">50+</div>
                <div className="hero-stat-label">Marcas</div>
              </div>
              <div>
                <div className="hero-stat-value">15+</div>
                <div className="hero-stat-label">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Categorías Principales</h2>
            <p className="section-subtitle">
              Explora nuestro catálogo organizado por categorías
            </p>
          </div>

          <div className="grid grid-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {categories.length > 0 ? (
              categories.slice(0, 8).map((cat) => (
                <Link key={cat.id} href={`/tienda?category=${cat.id}`} style={{ textDecoration: 'none' }}>
                  <div className="category-card">
                    <div className="category-icon">
                      {CATEGORY_ICONS[cat.slug] || '📦'}
                    </div>
                    <div className="category-name">{cat.name}</div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback categories
              [
                { name: 'Material Eléctrico', icon: '⚡' },
                { name: 'Herramientas', icon: '🔧' },
                { name: 'Iluminación', icon: '💡' },
                { name: 'Interruptores y Tableros', icon: '🔌' },
                { name: 'Tubería y Conduit', icon: '🔩' },
                { name: 'Accesorios y Fijación', icon: '📎' },
                { name: 'Ferretería General', icon: '🏗️' },
              ].map((cat, i) => (
                <Link key={i} href="/tienda" style={{ textDecoration: 'none' }}>
                  <div className="category-card">
                    <div className="category-icon">{cat.icon}</div>
                    <div className="category-name">{cat.name}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Productos Destacados</h2>
            <p className="section-subtitle">
              Los productos más recientes de nuestro catálogo
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <div className="empty-state-title">Cargando productos...</div>
              <div className="empty-state-text">
                Estamos configurando nuestro catálogo. Vuelve pronto.
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/tienda" className="btn btn-primary btn-lg">
              Ver Todos los Productos →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Marcas que Manejamos</h2>
            <p className="section-subtitle">
              Trabajamos con las mejores marcas del mercado
            </p>
          </div>

          <div className="brands-grid">
            {BRANDS.map((brand, i) => (
              <div key={i} className="brand-item">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Tienes un proyecto?</h2>
          <p className="cta-description">
            Cotiza tu proyecto eléctrico, civil o arquitectónico con nuestro equipo de expertos.
          </p>
          <div className="cta-buttons">
            <Link href="/cotizar" className="btn btn-white btn-lg">
              Solicitar Cotización
            </Link>
            <a
              href={`https://wa.me/526622151020?text=${encodeURIComponent('Hola, quiero cotizar un proyecto.')}`}
              className="btn btn-ghost btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Directo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
