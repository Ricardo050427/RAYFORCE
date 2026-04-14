'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/woocommerce';

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-8 py-24 md:py-40">
        <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center text-primary/30">
            <span className="material-symbols-outlined text-5xl">shopping_cart</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-background">
              Tu selección está vacía
            </h1>
            <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest max-w-md mx-auto">
              Aún no has añadido ningún componente técnico a tu solicitud.
            </p>
          </div>
          <Link 
            href="/tienda" 
            className="bg-primary text-on-primary px-8 py-4 rounded-md text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary-dim transition-all active:scale-[0.98]"
          >
            Explorar Catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-screen-2xl mx-auto px-8 py-12 md:py-20 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary font-semibold mb-4 block">
            Selección Actual
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-background leading-[0.9]">
            Tu Carrito
          </h1>
        </div>
        <Link 
          href="/tienda" 
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-2 group"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Continuar Comprando
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 space-y-12">
          {/* Cart Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-6 pb-6 border-b border-outline-variant/15 text-[10px] font-label uppercase tracking-widest text-outline">
            <div className="col-span-3">Detalle del Producto</div>
            <div className="text-center">Precio</div>
            <div className="text-center">Cantidad</div>
            <div className="text-right">Total</div>
          </div>

          {/* Table Body */}
          <div className="space-y-12">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col md:grid md:grid-cols-6 gap-6 items-center border-b border-outline-variant/10 pb-12 md:pb-0 md:border-none">
                <div className="col-span-3 flex items-center gap-8 w-full">
                  <div className="w-32 h-32 bg-surface-container-highest flex-shrink-0 relative overflow-hidden group border border-outline-variant/10">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline text-3xl">📦</div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-on-surface">{item.name}</h3>
                    <p className="text-xs font-label text-outline uppercase tracking-wider">SKU: {item.sku || 'N/A'}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] font-label text-error uppercase tracking-widest mt-2 flex items-center gap-1 hover:opacity-70 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span> Eliminar
                    </button>
                  </div>
                </div>
                
                <div className="text-center font-body font-semibold text-on-surface-variant">
                  {formatPrice(item.price)}
                </div>
                
                <div className="flex justify-center">
                  <div className="flex items-center border border-outline-variant/30 rounded-full overflow-hidden h-10 bg-surface-container-low">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 hover:bg-surface-container-high transition-colors text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="px-4 text-sm font-bold w-12 text-center text-on-surface">
                      {item.quantity.toString().padStart(2, '0')}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 hover:bg-surface-container-high transition-colors text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                
                <div className="text-right font-body font-bold text-lg text-on-surface">
                  {formatPrice(parseFloat(item.price) * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-surface-container-lowest border border-outline-variant/15 p-10 space-y-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">Resumen</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-label uppercase tracking-widest text-outline">Subtotal ({totalItems})</span>
                <span className="font-bold text-on-surface">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-label uppercase tracking-widest text-outline">Envío</span>
                <span className="font-bold text-primary text-[10px] uppercase tracking-widest">Por cotizar</span>
              </div>
              <div className="pt-6 border-t border-outline-variant/15 flex justify-between items-baseline">
                <span className="text-sm font-bold uppercase tracking-widest text-on-surface">Total</span>
                <span className="text-3xl font-extrabold text-primary tracking-tighter">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <Link 
                href="/checkout"
                className="w-full bg-primary text-on-primary py-5 rounded-md text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary-dim transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Proceder al Checkout
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              
              <a
                href={`https://wa.me/526622151020?text=${encodeURIComponent(
                  `Hola Rayforce, me gustaría cotizar mi carrito técnico:\n\n${items.map(i => `• ${i.name} (x${i.quantity}) - ${formatPrice(parseFloat(i.price) * i.quantity)}`).join('\n')}\n\nTotal estimado: ${formatPrice(totalPrice)}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-primary/20 text-primary py-4 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Consultar por WhatsApp
              </a>
              
              <p className="text-[10px] text-center text-outline uppercase tracking-wider">
                Infraestructura de Pagos de Alta Precisión
              </p>
            </div>
          </div>

          {/* Assistance Module */}
          <div className="mt-8 p-6 bg-primary-container/30 border border-primary-container flex items-start gap-4">
            <span className="material-symbols-outlined text-primary" data-weight="fill">verified_user</span>
            <div>
              <h4 className="text-sm font-bold text-on-primary-container mb-1">Soporte Técnico Incluido</h4>
              <p className="text-xs text-on-primary-container/70 leading-relaxed">
                Cada componente de nuestro catálogo incluye asesoría experta para su implementación técnica.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
