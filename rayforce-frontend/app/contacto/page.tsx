'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export default function ContactoPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title">Contacto</h1>
        <p className="page-header-subtitle">
          Estamos aquí para responder tus dudas y atender tus proyectos.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h2 className="section-title">Información de Contacto</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                Visítanos en nuestras oficinas o comunícate por cualquiera de nuestros canales.
              </p>

              <div className="contact-info-card">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">Dirección</div>
                  <div className="contact-info-value">
                    Campeche 250, Col San Benito<br />
                    C.P. 83190, Hermosillo, Sonora
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">📞</div>
                <div>
                  <div className="contact-info-label">Teléfonos</div>
                  <div className="contact-info-value">
                    (662) 215 10 20<br />
                    (662) 215 10 80
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <div className="contact-info-label">Correo Electrónico</div>
                  <div className="contact-info-value">
                    ventas2@rayforce.com.mx
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">🕐</div>
                <div>
                  <div className="contact-info-label">Horario de Atención</div>
                  <div className="contact-info-value">
                    Lunes a Viernes: 8:00 - 18:00 hrs<br />
                    Sábados: 8:00 - 14:00 hrs
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'var(--color-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
              <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-6)', color: 'var(--color-primary)' }}>Envíanos un mensaje</h3>

              {status === 'success' ? (
                <div className="empty-state">
                  <div className="empty-state-icon">✅</div>
                  <div className="empty-state-title">Mensaje Enviado</div>
                  <div className="empty-state-text">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </div>
                  <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="nombre">Nombre Completo *</label>
                    <input type="text" id="nombre" className="form-input" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="correo">Correo Electrónico *</label>
                    <input type="email" id="correo" className="form-input" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="asunto">Asunto</label>
                    <input type="text" id="asunto" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="mensaje">Mensaje *</label>
                    <textarea id="mensaje" className="form-input form-textarea" required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Map (Placeholder) */}
      <section style={{ height: '400px', background: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          <div style={{ fontSize: '40px', marginBottom: 'var(--space-2)' }}>🗺️</div>
          <p>Mapa de Google Maps aquí</p>
        </div>
      </section>
    </>
  );
}
