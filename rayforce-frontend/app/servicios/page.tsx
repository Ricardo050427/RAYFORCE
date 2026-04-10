import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios — Rayforce',
  description: 'Servicios profesionales de obras eléctricas, civiles, arquitectónicas, unidad verificadora y mantenimiento.',
};

const SERVICES = [
  {
    icon: '⚡',
    title: 'Obras Eléctricas',
    description: 'Diseño, instalación y mantenimiento de sistemas eléctricos residenciales, comerciales e industriales. Cumplimos con todas las normas NOM vigentes.',
  },
  {
    icon: '🏗️',
    title: 'Obras Civiles',
    description: 'Construcción y remodelación de espacios comerciales, residenciales e industriales con materiales de primera calidad.',
  },
  {
    icon: '📐',
    title: 'Proyectos Arquitectónicos',
    description: 'Diseño arquitectónico integral para todo tipo de proyectos, desde viviendas hasta complejos comerciales.',
  },
  {
    icon: '✅',
    title: 'Unidad Verificadora Eléctrica',
    description: 'Verificación de instalaciones eléctricas conforme a la NOM-001-SEDE. Emisión de dictámenes y certificaciones oficiales.',
  },
  {
    icon: '🔧',
    title: 'Mantenimiento Preventivo y Correctivo',
    description: 'Programas de mantenimiento para instalaciones eléctricas, transformadores, subestaciones y equipos industriales.',
  },
  {
    icon: '🔌',
    title: 'Subestaciones Eléctricas',
    description: 'Diseño, construcción, instalación y mantenimiento de subestaciones eléctricas de media y alta tensión.',
  },
  {
    icon: '📊',
    title: 'Tableros Eléctricos',
    description: 'Fabricación y ensamble de tableros eléctricos de distribución, control y fuerza a medida.',
  },
];

export default function ServiciosPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title">Nuestros Servicios</h1>
        <p className="page-header-subtitle">
          Soluciones integrales para tus proyectos eléctricos, civiles y arquitectónicos
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {SERVICES.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-card-icon">{service.icon}</div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-text">{service.description}</p>
                  <Link href="/cotizar" className="btn btn-primary btn-sm">
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Necesitas un servicio especializado?</h2>
          <p className="cta-description">
            Contáctanos para una cotización personalizada sin compromiso.
          </p>
          <div className="cta-buttons">
            <Link href="/cotizar" className="btn btn-white btn-lg">Cotizar Proyecto</Link>
            <a
              href="https://wa.me/526622151020?text=Hola, necesito información sobre sus servicios."
              className="btn btn-ghost btn-lg"
              target="_blank" rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
