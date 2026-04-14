'use client';

import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/woocommerce';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-24 max-w-[1440px] mx-auto px-8 min-h-[60vh] flex items-center justify-center animate-in fade-in duration-700">
        <div className="text-center space-y-6">
          <span className="material-symbols-outlined text-outline-variant text-6xl">shopping_cart</span>
          <h1 className="text-3xl font-extrabold tracking-tighter">Tu selección está vacía</h1>
          <p className="text-outline max-w-sm mx-auto">Debes seleccionar al menos un componente técnico antes de proceder al checkout seguro.</p>
          <Link href="/tienda" className="inline-block bg-primary text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest text-xs">
            Ir al Catálogo
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // WhatsApp fallback is currently the preferred method for this implementation phase
    const message = `Hola Rayforce, me interesa confirmar el siguiente pedido técnico:\n\n${items.map(i => `• ${i.name} (x${i.quantity}) - ${formatPrice(parseFloat(i.price) * i.quantity)}`).join('\n')}\n\nTotal estimado: ${formatPrice(totalPrice)}\n\nPor favor, indíquenme disponibilidad y opciones de flete.`;
    window.open(`https://wa.me/526622151020?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitting(false);
  };

  return (
    <main className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-16">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tighter font-headline uppercase leading-none">Checkout Seguro</h1>
            <div className="flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-sm">lock</span>
              Encripción AES-256
            </div>
          </div>

          {/* Section 1: Shipping */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold font-label bg-primary text-white w-6 h-6 flex items-center justify-center rounded-sm">01</span>
              <h2 className="text-xl font-extrabold tracking-tight font-headline uppercase">Datos de Envío</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Nombre(s) *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="Nombre completo" type="text"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Apellidos *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="Apellidos" type="text"/>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Dirección Completa *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="Calle, Número, Colonia" type="text"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Ciudad *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="Ciudad" type="text"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Código Postal *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="C.P." type="text"/>
              </div>
            </div>
          </section>

          {/* Section 2: Contact */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold font-label bg-primary text-white w-6 h-6 flex items-center justify-center rounded-sm">02</span>
              <h2 className="text-xl font-extrabold tracking-tight font-headline uppercase">Contacto Técnico</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Correo Electrónico *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="email@empresa.com" type="email"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-wider text-outline font-bold">Teléfono de Contacto *</label>
                <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="662..." type="tel"/>
              </div>
            </div>
          </section>

          {/* Trust Elements */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-outline-variant/10">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <div>
                <h4 className="font-bold text-[10px] uppercase font-headline tracking-widest text-on-surface">Garantía Industrial</h4>
                <p className="text-[10px] text-outline mt-1 leading-relaxed">Respaldamos cada componente con certificaciones de rendimiento a largo plazo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
              <div>
                <h4 className="font-bold text-[10px] uppercase font-headline tracking-widest text-on-surface">Logística Especializada</h4>
                <p className="text-[10px] text-outline mt-1 leading-relaxed">Manejo cuidadoso de componentes eléctricos y herramientas de precisión.</p>
              </div>
            </div>
          </div>
        </form>

        {/* Right Column: Order Summary (Sticky) */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 space-y-6">
            <div className="bg-surface-container-lowest shadow-2xl shadow-on-surface/5 p-10 rounded-sm border border-outline-variant/5">
              <h3 className="text-xl font-extrabold tracking-tight font-headline uppercase mb-8">Resumen de Selección</h3>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-surface-container-highest rounded-sm overflow-hidden flex-shrink-0 border border-outline-variant/5">
                      {item.image ? (
                        <img className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" src={item.image} alt={item.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline text-xl">📦</div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[11px] font-bold uppercase font-headline text-on-surface leading-tight">{item.name}</p>
                        <p className="text-[9px] text-outline font-label uppercase tracking-wider mt-1">SKU: {item.sku || 'N/A'}</p>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-label text-outline uppercase tracking-widest">Ctd: {item.quantity}</span>
                        <span className="font-bold text-on-surface">{formatPrice(parseFloat(item.price) * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-8 border-t border-outline-variant/20 font-label">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-outline">
                  <span>Subtotal ({totalItems})</span>
                  <span className="font-bold text-on-surface">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-outline">
                  <span>Envío</span>
                  <span className="font-bold text-primary italic">Por Cotizar</span>
                </div>
                <div className="flex justify-between text-xl font-black font-headline uppercase pt-5 border-t border-outline-variant/20">
                  <span>Total Est.</span>
                  <span className="text-primary tracking-tighter">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-10 bg-primary hover:bg-primary-dim text-on-primary py-5 rounded-md font-extrabold uppercase tracking-[0.2em] text-xs transition-all active:scale-[0.98] shadow-xl shadow-primary/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
              
              <div className="mt-8 flex justify-center gap-6 opacity-20 grayscale">
                <span className="material-symbols-outlined text-2xl">payments</span>
                <span className="material-symbols-outlined text-2xl">universal_currency</span>
                <span className="material-symbols-outlined text-2xl">qr_code_2</span>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-sm text-center border border-outline-variant/10">
              <p className="text-[9px] font-label uppercase tracking-widest text-outline leading-relaxed">
                Al confirmar el pedido, un asesor de Rayforce <br/>
                revisará la <span className="underline text-on-surface font-bold">Disponibilidad Técnica</span> de los productos.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
