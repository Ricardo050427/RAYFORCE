'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MiCuentaPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="page-header" style={{ padding: 'var(--space-8) 0' }}>
        <h1 className="page-header-title">Mi Cuenta</h1>
        <p className="page-header-subtitle">
          {isLogin ? 'Inicia sesión para gestionar tus pedidos.' : 'Crea una cuenta para agilizar tus compras.'}
        </p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '500px' }}>
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
            
            <div style={{ display: 'flex', marginBottom: 'var(--space-6)', borderBottom: '2px solid var(--color-border)' }}>
              <button
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  fontWeight: isLogin ? 700 : 400,
                  color: isLogin ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderBottom: isLogin ? '2px solid var(--color-accent)' : 'none',
                  marginBottom: '-2px'
                }}
                onClick={() => setIsLogin(true)}
              >
                Iniciar Sesión
              </button>
              <button
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  fontWeight: !isLogin ? 700 : 400,
                  color: !isLogin ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderBottom: !isLogin ? '2px solid var(--color-accent)' : 'none',
                  marginBottom: '-2px'
                }}
                onClick={() => setIsLogin(false)}
              >
                Registro
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" className="form-input" required />
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input type="email" className="form-input" required />
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-input" required />
              </div>

              {isLogin && (
                <div style={{ textAlign: 'right', marginBottom: 'var(--space-4)' }}>
                  <Link href="#" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)' }}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              )}

              <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                {isLogin ? 'Ingresar' : 'Crear Cuenta'}
              </button>
            </form>

            {/* Note about integration */}
            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              <p>ℹ️ Esta es una integración headless.</p>
              <p>Las credenciales se validarán contra los clientes de WooCommerce.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
