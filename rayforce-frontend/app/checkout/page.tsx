'use client';

import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/woocommerce';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0' }}>
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-title">No hay productos para pre-comprar</div>
          <Link href="/tienda" className="btn btn-primary">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Esta funcionalidad de la API de WooCommerce se implementará en la siguiente fase. Por ahora, usa la opción de pedido por WhatsApp.');
  };

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0' }}>
      <h1 className="section-title">Finalizar Compra / Cotización</h1>
      
      <div className="cart-layout" style={{ marginTop: 'var(--space-6)' }}>
        {/* Form */}
        <div>
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-light)', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)' }}>Datos de Contacto</h2>
            <form id="checkout-form" onSubmit={handleCheckout}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Nombre(s) *</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellidos *</label>
                  <input type="text" className="form-input" required />
                </div>
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Correo Electrónico *</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono *</label>
                  <input type="tel" className="form-input" required />
                </div>
              </div>
            </form>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-light)' }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)' }}>Dirección de Envío</h2>
            <form id="checkout-form" onSubmit={(e) => { e.preventDefault(); /* ... */ }}>
              <div className="form-group">
                <label className="form-label">Calle y Número *</label>
                <input type="text" className="form-input" required />
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Ciudad *</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Estado *</label>
                  <input type="text" className="form-input" required defaultValue="Sonora" />
                </div>
                <div className="form-group">
                  <label className="form-label">Código Postal *</label>
                  <input type="text" className="form-input" required />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">Resumen del Pedido</h2>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 'var(--space-4)', paddingRight: 'var(--space-2)' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ flex: 1, paddingRight: 'var(--space-2)' }}>
                  {item.name} <span style={{ color: 'var(--color-text-secondary)' }}>x{item.quantity}</span>
                </span>
                <span style={{ fontWeight: 600 }}>{formatPrice(parseFloat(item.price) * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', textAlign: 'center' }}>
            No incluye costos de envío. Un asesor confirmará el flete.
          </div>

          <button form="checkout-form" type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
            Solicitar Pedido
          </button>

          <a
            href={`https://wa.me/526622151020?text=${encodeURIComponent(
              `Hola, me gustaría confirmar este pedido:\n\n${items.map(i => `• ${i.name} (x${i.quantity}) - ${formatPrice(parseFloat(i.price) * i.quantity)}`).join('\n')}\n\nTotal: ${formatPrice(totalPrice)}\n\nPor favor, indíquenme opciones de envío y pago.`
            )}`}
            className="btn btn-outline"
            style={{ width: '100%', marginTop: 'var(--space-2)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Confirmar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
