'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/woocommerce';

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" style={{ padding: '6rem 0' }}>
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-title">Tu carrito está vacío</div>
          <div className="empty-state-text">
            Agrega productos desde nuestra tienda para comenzar tu compra.
          </div>
          <Link href="/tienda" className="btn btn-primary btn-lg">
            Ir a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ padding: 'var(--space-8) 0 var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700 }}>
          Carrito de Compras
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
          {totalItems} producto{totalItems !== 1 ? 's' : ''} en tu carrito
        </p>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              {item.image ? (
                <img src={item.image} alt={item.name} className="cart-item-image" />
              ) : (
                <div className="cart-item-image" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', color: 'var(--color-text-light)',
                }}>
                  📦
                </div>
              )}

              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-light)' }}>
                  SKU: {item.sku}
                </div>
                <div className="cart-item-price">
                  {formatPrice(item.price)}
                </div>
              </div>

              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <input
                  className="quantity-value"
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                />
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)', minWidth: 100, textAlign: 'right' }}>
                {formatPrice(parseFloat(item.price) * item.quantity)}
              </div>

              <button className="cart-item-remove" onClick={() => removeItem(item.id)} title="Eliminar">
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            style={{
              alignSelf: 'flex-start',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
              padding: 'var(--space-2)',
            }}
          >
            🗑 Vaciar carrito
          </button>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <div className="cart-summary-title">Resumen del Pedido</div>

          <div className="cart-summary-row">
            <span>Subtotal ({totalItems} productos)</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="cart-summary-row">
            <span>Envío</span>
            <span style={{ color: 'var(--color-accent)' }}>Por cotizar</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <Link href="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
            Proceder al Checkout
          </Link>

          <a
            href={`https://wa.me/526622151020?text=${encodeURIComponent(
              `Hola, me gustaría hacer un pedido:\n\n${items.map(i => `• ${i.name} (x${i.quantity}) - ${formatPrice(parseFloat(i.price) * i.quantity)}`).join('\n')}\n\nTotal: ${formatPrice(totalPrice)}`
            )}`}
            className="btn btn-outline"
            style={{ width: '100%', marginTop: 'var(--space-2)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Pedir por WhatsApp
          </a>

          <Link href="/tienda" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 'var(--space-4)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-accent)',
          }}>
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
