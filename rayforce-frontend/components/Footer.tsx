import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-name">
              RAY<span className="accent">FORCE</span>
            </div>
            <p>
              Soluciones eléctricas, materiales de calidad y servicios integrales.
              Más de 2,000 productos disponibles para proyectos residenciales,
              comerciales e industriales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Navegación</div>
            <div className="footer-links">
              <Link href="/tienda">Tienda en Línea</Link>
              <Link href="/servicios">Servicios</Link>
              <Link href="/cotizar">Cotizar Proyecto</Link>
              <Link href="/nosotros">Sobre Nosotros</Link>
              <Link href="/contacto">Contacto</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-col-title">Categorías</div>
            <div className="footer-links">
              <Link href="/tienda?cat=material-electrico">Material Eléctrico</Link>
              <Link href="/tienda?cat=herramientas">Herramientas</Link>
              <Link href="/tienda?cat=iluminacion">Iluminación</Link>
              <Link href="/tienda?cat=interruptores">Interruptores y Tableros</Link>
              <Link href="/tienda?cat=ferreteria">Ferretería General</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contacto</div>
            <div className="footer-contact-item">
              📍 Campeche 250, Col San Benito, C.P. 83190, Hermosillo, Sonora
            </div>
            <div className="footer-contact-item">
              📞 (662) 215 10 20 / 215 10 80
            </div>
            <div className="footer-contact-item">
              ✉️ ventas2@rayforce.com.mx
            </div>
            <div className="footer-contact-item">
              🕐 Lun - Vie: 8:00 - 18:00 | Sáb: 8:00 - 14:00
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rayforce. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/legales/privacidad">Aviso de Privacidad</Link>
            <Link href="/legales/terminos">Términos y Condiciones</Link>
            <Link href="/legales/devoluciones">Devoluciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
