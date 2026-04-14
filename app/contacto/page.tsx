'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactoPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulated submission
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto animate-in fade-in duration-700">
      <header className="mb-20">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-6 block font-black">Technical Advisory</span>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-on-surface uppercase max-w-4xl">
          Conectividad & <br/><span className="text-primary italic font-light drop-shadow-sm">Soporte Directo.</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Contact Info */}
        <div className="lg:col-span-4 space-y-16">
          <section>
            <h2 className="font-label text-[11px] font-extrabold uppercase tracking-[0.2em] mb-8 text-on-surface border-b border-outline-variant/15 pb-2">
              Sede Central
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Dirección Física</p>
                  <p className="text-sm text-outline font-body leading-relaxed">
                    Campeche 250, Col. San Benito<br />
                    C.P. 83190, Hermosillo, Sonora
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">call</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Líneas Técnicas</p>
                  <p className="text-sm text-outline font-body leading-relaxed">
                    (662) 215 10 20<br />
                    (662) 215 10 80
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">mail</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Enlace Digital</p>
                  <p className="text-sm text-outline font-body leading-relaxed">
                    ventas2@rayforce.com.mx
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-label text-[11px] font-extrabold uppercase tracking-[0.2em] mb-8 text-on-surface border-b border-outline-variant/15 pb-2">
              Sincronización
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-outline">
                <span>Lunes — Viernes</span>
                <span className="text-on-surface">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-outline">
                <span>Sábados</span>
                <span className="text-on-surface">08:00 - 14:00</span>
              </div>
            </div>
          </section>

          <div className="pt-8">
            <Link 
              href="https://wa.me/526622151020" 
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-[0.98] shadow-lg shadow-green-500/20"
            >
              <span className="material-symbols-outlined">forum</span>
              Enlace Vía WhatsApp
            </Link>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-8 bg-surface-container-low p-10 md:p-16 rounded-sm border border-outline-variant/10">
          <div className="mb-12">
            <h3 className="text-3xl font-extrabold tracking-tight text-on-surface uppercase mb-4">Ticket de Consulta</h3>
            <p className="text-xs uppercase tracking-widest text-outline font-bold">Un asesor técnico revisará su solicitud en un plazo menor a 4 horas.</p>
          </div>

          {status === 'success' ? (
            <div className="py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-success text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-success/20">
                <span className="material-symbols-outlined text-4xl">check</span>
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-extrabold uppercase tracking-tight">Transmisión Exitosa</h4>
                <p className="text-xs text-outline uppercase tracking-widest font-bold font-label">Hemos recibido sus datos técnicos. En breve estableceremos contacto.</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="bg-primary text-white px-10 py-4 font-black uppercase tracking-[0.2em] text-[10px]"
              >
                Nuevo Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-black text-on-surface">Nombre Completo *</label>
                  <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="Su nombre" type="text" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-black text-on-surface">Correo Corporativo *</label>
                  <input required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="email@empresa.com" type="email" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-widest font-black text-on-surface">Asunto / Especialidad</label>
                <input className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30" placeholder="Ej: Cotización de transformadores" type="text" />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-widest font-black text-on-surface">Descripción de Requerimientos *</label>
                <textarea required className="bg-transparent border-none border-b border-outline-variant/30 px-0 py-3 text-sm focus:ring-0 focus:border-primary transition-all placeholder:text-outline/30 min-h-[120px] resize-none" placeholder="Detalle técnico de su consulta..."></textarea>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full md:w-auto bg-primary text-on-primary px-16 py-6 font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-primary-dim active:scale-[0.98] shadow-2xl shadow-primary/20 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Transmitiendo...' : 'Enviar Requerimiento'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Map Section */}
      <section className="mt-32 grayscale hover:grayscale-0 transition-all duration-700 opacity-50 hover:opacity-100 border border-outline-variant/10">
        <div className="h-[400px] w-full bg-surface-container-highest flex items-center justify-center relative group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
          <div className="text-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-outline text-6xl mb-4">map</span>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-outline">Establecimiento Físico Central: Hermosillo, Sonora</p>
          </div>
        </div>
      </section>
    </main>
  );
}
