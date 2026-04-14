import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingeniería & Servicios Técnicos | Rayforce',
  description: 'Soluciones integrales de ingeniería eléctrica, civil y arquitectónica. Desde subestaciones hasta consultoría técnica especializada.',
};

const SERVICES = [
  {
    id: 'elec',
    icon: 'electric_bolt',
    title: 'Obras Eléctricas',
    description: 'Diseño e instalación de sistemas de alta potencia residenciales e industriales bajo normativas internacionales.',
    color: 'bg-primary'
  },
  {
    id: 'civ',
    icon: 'foundation',
    title: 'Obras Civiles',
    description: 'Infraestructura robusta para complejos comerciales y naves industriales con precisión técnica.',
    color: 'bg-surface-container-high'
  },
  {
    id: 'arq',
    icon: 'architecture',
    title: 'Arquitectura',
    description: 'Diseño arquitectónico funcional que integra estética moderna con eficiencia energética industrial.',
    color: 'bg-surface-container-high'
  },
  {
    id: 'uvie',
    icon: 'verified',
    title: 'Unidad Verificadora',
    description: 'Certificación oficial NOM-001-SEDE para garantizar la seguridad total de sus instalaciones.',
    color: 'bg-primary'
  },
  {
    id: 'mant',
    icon: 'build',
    title: 'Mantenimiento',
    description: 'Programas preventivos y predictivos para subestaciones y equipos de potencia crítica.',
    color: 'bg-surface-container-high'
  },
  {
    id: 'sub',
    icon: 'settings_input_component',
    title: 'Subestaciones',
    description: 'Ingeniería avanzada en media y alta tensión: diseño, construcción y puesta en marcha.',
    color: 'bg-surface-container-high'
  }
];

export default function ServiciosPage() {
  return (
    <main className="pt-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="px-8 py-24 md:py-32 overflow-hidden bg-surface-container/30">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-3/5 z-10">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-6 block font-black">Technical Hub</span>
            <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-10 text-on-surface">
              Ingeniería de <br/><span className="text-primary italic font-light drop-shadow-sm">Sistemas Críticos.</span>
            </h1>
            <p className="font-body text-xl text-outline max-w-2xl leading-relaxed">
              Desplegamos soluciones de infraestructura que integran la comercialización de componentes de alta gama con servicios de ingeniería de precisión.
            </p>
          </div>
          <div className="w-full md:w-2/5 hidden md:block">
            <div className="aspect-square bg-surface-container-highest rounded-full flex items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              <img 
                alt="Technical Engineering" 
                className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-60 grayscale" 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid: Bento Layout */}
      <section className="bg-surface py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="font-headline text-4xl font-extrabold tracking-tighter uppercase">Portafolio de Soluciones</h2>
            <p className="font-body text-outline max-w-sm text-right text-xs uppercase tracking-widest leading-loose font-bold">
              Cada servicio es ejecutado bajo protocolos internacionales de seguridad y eficiencia técnica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Service (Bento Large) */}
            <div className="md:col-span-2 group bg-primary p-12 rounded-sm flex flex-col justify-between min-h-[400px] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10 font-black text-9xl text-white pointer-events-none uppercase">Eng</div>
               <div className="relative z-10">
                <span className="material-symbols-outlined text-on-primary text-5xl mb-8">engineering</span>
                <h3 className="text-3xl font-extrabold text-on-primary mb-6 tracking-tight uppercase">Consultoría Técnica <br/> & Proyectos Llave en Mano</h3>
                <p className="text-on-primary/70 leading-relaxed max-w-md uppercase text-xs tracking-widest font-bold">
                  Desde la conceptualización hasta la puesta en marcha, gestionamos cada fase del ciclo de vida de su infraestructura industrial.
                </p>
              </div>
              <Link 
                href="/contacto" 
                className="relative z-10 self-start mt-12 bg-white text-primary px-8 py-4 font-black uppercase text-[10px] tracking-[0.2em] rounded-sm hover:translate-x-2 transition-transform shadow-xl"
              >
                Solicitar Diagnóstico
              </Link>
            </div>

            {/* Other Services */}
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className={`group p-10 rounded-sm flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:shadow-xl border border-outline-variant/10 ${service.color === 'bg-primary' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-highest'}`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-sm flex items-center justify-center mb-10 transition-transform group-hover:scale-110 ${service.color === 'bg-primary' ? 'bg-white/10' : 'bg-primary'}`}>
                    <span className={`material-symbols-outlined ${service.color === 'bg-primary' ? 'text-white' : 'text-on-primary'}`}>{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-extrabold mb-4 tracking-tight uppercase">{service.title}</h3>
                  <p className={`text-xs uppercase tracking-widest leading-relaxed font-bold ${service.color === 'bg-primary' ? 'text-on-primary/70' : 'text-outline group-hover:text-on-surface'}`}>
                    {service.description}
                  </p>
                </div>
                <Link 
                  href="/contacto" 
                  className={`self-end font-black py-2 border-b-2 transition-all group-hover:px-4 ${service.color === 'bg-primary' ? 'text-white border-white/20 hover:border-white' : 'text-primary border-primary/20 hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Venta: Dark Section */}
      <section className="bg-on-surface py-32 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9] uppercase">
              Soporte <span className="text-primary italic font-light drop-shadow-lg">Especializado</span> <br/> 24/7 en Sitio.
            </h2>
            <p className="text-white/60 text-sm uppercase tracking-[0.2em] leading-loose mb-12 font-bold max-w-lg">
              Entendemos que la continuidad operativa es crítica. Nuestros equipos de respuesta técnica están preparados para intervenciones de emergencia y mantenimiento reactivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                href="https://wa.me/526622151020" 
                className="bg-primary text-on-primary px-10 py-5 font-black uppercase text-[10px] tracking-[0.2em] rounded-sm text-center active:scale-95 transition-all shadow-2xl shadow-primary/20"
              >
                Atención Inmediata
              </Link>
              <Link 
                href="/contacto" 
                className="border border-white/20 text-white px-10 py-5 font-black uppercase text-[10px] tracking-[0.2em] rounded-sm text-center hover:bg-white/5 transition-all"
              >
                Agendar Preventivo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 aspect-video rounded-sm overflow-hidden border border-white/5 relative group">
             <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
               alt="Control Center" 
             />
          </div>
        </div>
      </section>
    </main>
  );
}
