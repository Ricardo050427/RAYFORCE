'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tienda?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="header">
        {/* Top Bar */}
        <div className="header-top">
          <div className="container">
            <div className="header-top-links">
              <a href="tel:6622151020">📞 (662) 215 10 20</a>
              <a href="mailto:ventas2@rayforce.com.mx">✉️ ventas2@rayforce.com.mx</a>
            </div>
            <div className="header-top-links">
              <Link href="/nosotros">Sobre Nosotros</Link>
              <Link href="/contacto">Contacto</Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-main">
          <div className="container">
            <Link href="/" className="header-logo">
              RAY<span className="logo-accent">FORCE</span>
            </Link>

            <form className="header-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar productos por nombre, SKU o categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="header-search-btn">
                🔍
              </button>
            </form>

            <div className="header-actions">
              <Link href="/cuenta" className="header-action-btn">
                <span className="icon">👤</span>
                <span>Mi Cuenta</span>
              </Link>

              <Link href="/carrito" className="header-action-btn">
                <span className="icon">🛒</span>
                <span>Carrito</span>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>

              <button
                className="header-mobile-toggle"
                onClick={() => setMobileOpen(true)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav-bar">
          <div className="container">
            <Link href="/" className="nav-link">Inicio</Link>
            <Link href="/tienda" className="nav-link">Tienda</Link>
            <Link href="/servicios" className="nav-link">Servicios</Link>
            <Link href="/cotizar" className="nav-link">Cotizar Proyecto</Link>
            <Link href="/nosotros" className="nav-link">Nosotros</Link>
            <Link href="/contacto" className="nav-link">Contacto</Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>
            RAY<span style={{ color: 'var(--color-accent)' }}>FORCE</span>
          </span>
          <button className="mobile-menu-close" onClick={() => setMobileOpen(false)}>
            ✕
          </button>
        </div>

        <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} style={{ marginBottom: '1.5rem' }}>
          <input
            className="form-input"
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="mobile-menu-links">
          <Link href="/" onClick={() => setMobileOpen(false)}>Inicio</Link>
          <Link href="/tienda" onClick={() => setMobileOpen(false)}>Tienda</Link>
          <Link href="/servicios" onClick={() => setMobileOpen(false)}>Servicios</Link>
          <Link href="/cotizar" onClick={() => setMobileOpen(false)}>Cotizar Proyecto</Link>
          <Link href="/nosotros" onClick={() => setMobileOpen(false)}>Nosotros</Link>
          <Link href="/contacto" onClick={() => setMobileOpen(false)}>Contacto</Link>
          <Link href="/carrito" onClick={() => setMobileOpen(false)}>
            🛒 Carrito {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </div>
    </>
  );
}
