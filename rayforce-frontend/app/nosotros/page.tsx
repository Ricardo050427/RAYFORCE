import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros — Rayforce',
  description: 'Conoce más sobre Rayforce, nuestra misión, visión y experiencia en soluciones eléctricas y ferretería.',
};

export default function NosotrosPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title">Sobre Nosotros</h1>
        <p className="page-header-subtitle">
          Soluciones eléctricas, materiales de calidad y servicios integrales
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)' }}>
            <div>
              <h2 className="section-title">Nuestra Historia</h2>
              <p style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                En <strong>Rayforce</strong> nos hemos consolidado como una empresa líder en el noroeste de México,
                dedicada a proveer soluciones integrales en el sector eléctrico, construcción y mantenimiento.
              </p>
              <p style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                Nuestra experiencia nos permite no solo ofrecer un amplio catálogo de más de 2,000 productos
                de las mejores marcas, sino también brindar servicios profesionales que abarcan desde el
                diseño arquitectónico hasta la ejecución de obras civiles y eléctricas, cumpliendo siempre
                con los más altos estándares de calidad y normas vigentes.
              </p>
            </div>
            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: '100px', marginBottom: 'var(--space-4)' }}>⚡</div>
              <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>Experiencia y Confianza</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Acompañando el desarrollo industrial y comercial de Sonora.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-primary)', color: 'white' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: 'var(--space-12)' }}>
            <div className="service-card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
              <div className="service-card-body">
                <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-4)', color: 'var(--color-accent)' }}>Nuestra Misión</h3>
                <p style={{ lineHeight: 'var(--line-height-relaxed)', opacity: 0.9 }}>
                  Proveer materiales eléctricos y ferreteros de la más alta calidad, así como servicios
                  profesionales de ingeniería y construcción, superando las expectativas de nuestros clientes
                  mediante atención personalizada, eficiencia y precios competitivos.
                </p>
              </div>
            </div>
            <div className="service-card" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
              <div className="service-card-body">
                <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-4)', color: 'var(--color-accent)' }}>Nuestra Visión</h3>
                <p style={{ lineHeight: 'var(--line-height-relaxed)', opacity: 0.9 }}>
                  Ser la empresa referente a nivel nacional en la comercialización de equipo eléctrico
                  y la ejecución de proyectos integrales, reconocida por nuestra innovación, confiabilidad
                  y el compromiso con el desarrollo sostenible de nuestra comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
