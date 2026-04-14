import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Nuestra Ingeniería | Rayforce Technical Atelier',
  description: 'Conoce la visión, misión y la evolución técnica tras Rayforce. Redefiniendo los estándares industriales mediante precisión matemática.',
};

export default function NosotrosPage() {
  return (
    <main className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden bg-surface-container">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Rayforce Engineering Vision" 
            className="w-full h-full object-cover grayscale opacity-30" 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-6 block font-black">
              Digital Atelier
            </span>
            <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-[0.9] mb-8">
              La Ingeniería del <br/> Futuro, <span className="text-primary italic font-light drop-shadow-sm">Hoy.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Redefiniendo los estándares industriales mediante precisión matemática y diseño vanguardista desde Sonora para el mundo. No solo suministramos componentes; diseñamos soluciones permanentes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-4">
            <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-4 font-bold">Nuestra Misión</h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-headline text-3xl md:text-5xl font-light leading-tight text-on-surface">
              Nuestra misión es transformar la infraestructura industrial a través de la <span className="font-extrabold">excelencia técnica</span> y el suministro de componentes inteligentes que optimizan cada watt de potencia.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values: Bento-style Grid */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="mb-20">
            <h2 className="font-headline text-4xl font-extrabold tracking-tighter uppercase">Valores Fundamentales</h2>
            <div className="h-1 w-20 bg-primary mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Precision */}
            <div className="bg-surface-container-lowest p-10 group hover:bg-primary transition-all duration-500 border border-outline-variant/10">
              <span className="material-symbols-outlined text-4xl mb-8 text-primary group-hover:text-on-primary transition-colors">architecture</span>
              <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-on-primary tracking-tight">Precisión</h3>
              <p className="font-body text-xs text-on-surface-variant group-hover:text-on-primary/80 leading-relaxed uppercase tracking-wider font-semibold">
                Tolerancia cero al error. Cada componente en nuestro catálogo es validado bajo los estándares más rigurosos del mercado industrial.
              </p>
            </div>
            {/* Innovation */}
            <div className="bg-surface-container-lowest p-10 group hover:bg-primary transition-all duration-500 border border-outline-variant/10">
              <span className="material-symbols-outlined text-4xl mb-8 text-primary group-hover:text-on-primary transition-colors">lightbulb</span>
              <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-on-primary tracking-tight">Innovación</h3>
              <p className="font-body text-xs text-on-surface-variant group-hover:text-on-primary/80 leading-relaxed uppercase tracking-wider font-semibold">
                Exploramos constantemente nuevas fronteras en la ciencia de materiales complejos y eficiencia energética de alto nivel.
              </p>
            </div>
            {/* Reliability */}
            <div className="bg-surface-container-lowest p-10 group hover:bg-primary transition-all duration-500 border border-outline-variant/10">
              <span className="material-symbols-outlined text-4xl mb-8 text-primary group-hover:text-on-primary transition-colors">verified_user</span>
              <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-on-primary tracking-tight">Fiabilidad</h3>
              <p className="font-body text-xs text-on-surface-variant group-hover:text-on-primary/80 leading-relaxed uppercase tracking-wider font-semibold">
                Hardware diseñado para durar décadas, garantizando la continuidad total de su operación técnica y suministro ininterrumpido.
              </p>
            </div>
            {/* Sustainability */}
            <div className="bg-surface-container-lowest p-10 group hover:bg-primary transition-all duration-500 border border-outline-variant/10">
              <span className="material-symbols-outlined text-4xl mb-8 text-primary group-hover:text-on-primary transition-colors">eco</span>
              <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-on-primary tracking-tight">Sostenibilidad</h3>
              <p className="font-body text-xs text-on-surface-variant group-hover:text-on-primary/80 leading-relaxed uppercase tracking-wider font-semibold">
                Compromiso real con la reducción de la huella técnica a través de procesos de manufactura y distribución circulares.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History/Timeline */}
      <section className="py-32 bg-surface overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="mb-20 flex justify-between items-baseline border-b border-outline-variant/10 pb-8">
            <h2 className="font-headline text-4xl font-extrabold tracking-tighter uppercase">Evolución</h2>
            <span className="font-label text-xs text-outline font-bold tracking-[0.2em]">RAYFORCE — MMX-MMXXIV</span>
          </div>
          <div className="relative">
            <div className="absolute top-[2.15rem] left-0 w-full h-[1px] bg-outline-variant/30 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {/* 2010 */}
              <div className="flex flex-col gap-6">
                <div className="w-5 h-5 rounded-sm bg-primary border-4 border-surface shadow-md"></div>
                <div className="space-y-4">
                  <span className="font-headline text-5xl font-black text-primary/10">2010</span>
                  <h4 className="font-headline text-xl font-extrabold tracking-tight uppercase">Fundación</h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">Rayforce emerge como un taller de consultoría técnica especializada en el Noroeste del país.</p>
                </div>
              </div>
              {/* 2015 */}
              <div className="flex flex-col gap-6">
                <div className="w-5 h-5 rounded-sm bg-primary border-4 border-surface shadow-md"></div>
                <div className="space-y-4">
                  <span className="font-headline text-5xl font-black text-primary/10">2015</span>
                  <h4 className="font-headline text-xl font-extrabold tracking-tight uppercase">Expansión</h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">Consolidamos nuestro centro logístico con más de 2,000 SKUs de alta precisión industrial.</p>
                </div>
              </div>
              {/* 2020 */}
              <div className="flex flex-col gap-6">
                <div className="w-5 h-5 rounded-sm bg-primary border-4 border-surface shadow-md"></div>
                <div className="space-y-4">
                  <span className="font-headline text-5xl font-black text-primary/10">2020</span>
                  <h4 className="font-headline text-xl font-extrabold tracking-tight uppercase">Tecnologia</h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">Integración de sistemas inteligentes y digitalización de la cadena de suministro técnica.</p>
                </div>
              </div>
              {/* 2024 */}
              <div className="flex flex-col gap-6">
                <div className="w-5 h-5 rounded-sm bg-primary border-4 border-surface shadow-md animate-pulse"></div>
                <div className="space-y-4">
                  <span className="font-headline text-5xl font-black text-primary/10">2024</span>
                  <h4 className="font-headline text-xl font-extrabold tracking-tight uppercase">Atelier</h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">Lanzamiento del Digital Atelier: la experiencia de suministro industrial definitiva.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="bg-primary p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="grid grid-cols-12 h-full w-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-r border-on-primary h-full"></div>
                ))}
              </div>
            </div>
            
            <h2 className="font-headline text-3xl md:text-6xl font-extrabold text-on-primary tracking-tighter mb-12 relative z-10 leading-[0.9] uppercase max-w-4xl">
              ¿Listo para el siguiente nivel de precisión técnica?
            </h2>
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <Link 
                href="/tienda" 
                className="bg-on-primary text-primary px-12 py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:opacity-90 active:scale-95 transition-all"
              >
                Explorar Catálogo
              </Link>
              <Link 
                href="/contacto" 
                className="border border-on-primary text-on-primary px-12 py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-on-primary/10 active:scale-95 transition-all"
              >
                Consultoría Técnica
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
