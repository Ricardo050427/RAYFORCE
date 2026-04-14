'use client';

import Link from 'next/link';
import { WooProduct, formatPrice } from '@/lib/woocommerce';
import { useCart } from '@/lib/cart';
import { useState } from 'react';

export default function ProductCard({ product }: { product: WooProduct }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const mainImage = product.images?.[0]?.src || '';
  const price = product.price || product.regular_price || '0';

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: mainImage,
      sku: product.sku,
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Link href={`/tienda/${product.slug}`} className="block">
        <div className="aspect-[4/5] bg-surface-container-highest overflow-hidden relative mb-6 border border-outline-variant/10">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-outline-variant">
              📦
            </div>
          )}
          
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg ${
              isAdding 
                ? 'bg-success text-white' 
                : 'bg-primary text-on-primary opacity-0 group-hover:opacity-100 hover:scale-110'
            }`}
            title="Agregar al carrito"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAdding ? 'check' : 'add_shopping_cart'}
            </span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-outline mb-1 block truncate">
                {product.sku || 'REF-TBA'}
              </span>
              <h4 className="text-sm font-bold tracking-tight text-on-surface uppercase group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {product.name}
              </h4>
            </div>
            <span className="text-sm font-bold text-primary whitespace-nowrap">
              {parseFloat(price) > 0 ? formatPrice(price) : 'Cotizar'}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.categories?.[0] && (
              <span className="font-label text-[8px] bg-surface-container-high px-2 py-0.5 rounded-sm text-outline uppercase tracking-wider">
                {product.categories[0].name}
              </span>
            )}
            {product.stock_status === 'instock' && (
              <span className="font-label text-[8px] border border-success/30 px-2 py-0.5 rounded-sm text-success uppercase tracking-wider font-bold">
                In Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
