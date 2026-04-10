'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export default function CotizarPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Aquí iría la lógica real de envío, ej: conectar con una API, formspree, etc.
    // Simulamos un envío
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title">Cotizar Proyecto</h1>
        <p className="page-header-subtitle">
          Completa el formulario para enviarnos los detalles de tu proyecto y nuestro equipo te contactará con una propuesta.
        </p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          {status === 'success' ? (
            <div className="empty-state" style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
              <div className="empty-state-icon">✅</div>
              <div className="empty-state-title">Solicitud Enviada</div>
              <div className="empty-state-text">
                Hemos recibido la información de tu proyecto. Un asesor se pondrá en contacto contigo pronto.
              </div>
              <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'var(--color-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-light)' }}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="nombre">Nombre Completo *</label>
                  <input type="text" id="nombre" name="nombre" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="empresa">Empresa (Opcional)</label>
                  <input type="text" id="empresa" name="empresa" className="form-input" />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="telefono">Teléfono *</label>
                  <input type="tel" id="telefono" name="telefono" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="correo">Correo Electrónico *</label>
                  <input type="email" id="correo" name="correo" className="form-input" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="tipo_proyecto">Tipo de Proyecto *</label>
                <select id="tipo_proyecto" name="tipo_proyecto" className="form-input form-select" required>
                  <option value="">Selecciona una opción</option>
                  <option value="obra_electrica">Obra Eléctrica</option>
                  <option value="obra_civil">Obra Civil</option>
                  <option value="arquitectonico">Proyecto Arquitectónico</option>
                  <option value="unidad_verificadora">Unidad Verificadora Eléctrica</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="subestacion">Subestación / Tableros</option>
                  <option value="material">Solo venta de material / mayoreo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ubicacion">Ubicación del Proyecto *</label>
                <input type="text" id="ubicacion" name="ubicacion" className="form-input" placeholder="Ciudad, Estado" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="descripcion">Descripción del Proyecto *</label>
                <textarea id="descripcion" name="descripcion" className="form-input form-textarea" placeholder="Describe brevemente las necesidades de tu proyecto..." required></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud de Cotización'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
