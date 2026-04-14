'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { WooProduct } from '@/lib/woocommerce';

export default function AddToCartButton({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = product.price || product.regular_price || '0';
  const mainImage = product.images?.[0]?.src || '';

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: mainImage,
      sku: product.sku,
    }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-actions">
      <div className="quantity-selector">
        <button
          className="quantity-btn"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          −
        </button>
        <input
          className="quantity-value"
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        />
        <button
          className="quantity-btn"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      <button
        className={`btn ${added ? 'btn-secondary' : 'btn-primary'} btn-lg`}
        style={{ flex: 1 }}
        onClick={handleAdd}
      >
        {added ? '✓ Agregado al Carrito' : '🛒 Agregar al Carrito'}
      </button>
    </div>
  );
}
