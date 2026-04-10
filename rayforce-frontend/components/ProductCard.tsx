'use client';

import Link from 'next/link';
import { WooProduct, formatPrice } from '@/lib/woocommerce';
import { useCart } from '@/lib/cart';
import { useState } from 'react';

export default function ProductCard({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const mainImage = product.images?.[0]?.src || '';
  const price = product.price || product.regular_price || '0';

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: mainImage,
      sku: product.sku,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/tienda/${product.slug}`} className="card" style={{ textDecoration: 'none' }}>
      {mainImage ? (
        <img
          src={mainImage}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
      ) : (
        <div className="card-image" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          color: 'var(--color-text-light)',
        }}>
          📦
        </div>
      )}
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        {parseFloat(price) > 0 ? (
          <div className="card-price">
            {formatPrice(price)}
            <span className="card-price-currency"> MXN</span>
          </div>
        ) : (
          <div className="card-price" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Solicitar precio
          </div>
        )}
        <div className="card-sku">SKU: {product.sku || 'N/A'}</div>
        <button
          className={`btn ${added ? 'btn-secondary' : 'btn-primary'}`}
          style={{ width: '100%', marginTop: 'var(--space-3)' }}
          onClick={handleAdd}
        >
          {added ? '✓ Agregado' : '🛒 Agregar al carrito'}
        </button>
      </div>
    </Link>
  );
}
