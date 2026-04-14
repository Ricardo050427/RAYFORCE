import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[870px] flex items-center overflow-hidden bg-surface-container-lowest -mt-20">
        <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="z-10 space-y-8">
            <div className="inline-flex items-center px-3 py-1 bg-primary-container text-primary rounded-full">
              <span className="text-[10px] font-bold uppercase tracking-widest font-label">Nueva Colección Industrial 2024</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-on-surface">
              Soluciones <span className="text-primary">eléctricas</span> y de ferretería en un solo lugar.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md font-light leading-relaxed">
              Ingeniería de precisión aplicada a cada componente. Suministros industriales para proyectos que demandan excelencia y durabilidad técnica.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/productos" className="px-8 py-4 bg-primary text-on-primary font-bold rounded-md hover:bg-primary-dim transition-all active:scale-95">
                Ver productos
              </Link>
              <Link href="/consultoria" className="px-8 py-4 border-2 border-outline-variant text-on-surface font-bold rounded-md hover:bg-surface-container transition-all">
                Consultoría Técnica
              </Link>
            </div>
          </div>
          <div className="relative group h-full py-12">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-700"></div>
            <img 
              alt="Electrical Components" 
              className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/5] w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNGD-_RDH3dP2Pz11rBhUhFV_JGXhzAiKaXOgKLxqvJT298v4slo1sgWVfyB7uf2a4b5KsCyRH5AQT5DpQUzGytbppEvcxxmyzgYadqWUqF_N61G5-RZfezCpyO5XSyYyBqavSMCruQiSTNmpUoXaWU330QX__pKSb5CK7kIa_vYhZqwzXfk1st8M6EeUlk49JaPesGQx_MWca8RBYXWnbC2jdBet7CxZ02EgnIejctlUCghjZQ8gYqI8cr-_xtFKr7QXp89WTd7ZU"
            />
          </div>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-gradient-to-l from-primary-container/20 to-transparent blur-3xl -z-10"></div>
      </section>

      {/* Main Categories */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">Explorar por</span>
              <h2 className="text-4xl font-bold tracking-tight">Categorías de Ingeniería</h2>
            </div>
            <Link className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1 font-label text-sm" href="/categorias">Ver todas las líneas</Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Card 1 */}
            <Link href="/categorias/electrico" className="group relative aspect-square bg-surface-container-lowest rounded-xl overflow-hidden hover:bg-primary transition-colors duration-500 block">
              <div className="absolute inset-8 flex flex-col justify-between">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">electric_bolt</span>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-white transition-colors">Material eléctrico</h3>
                  <p className="text-xs font-label text-on-surface-variant group-hover:text-white/70 transition-colors mt-1">Conductores, tableros y protecciones</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-4 translate-y-4 opacity-10 group-hover:scale-150 transition-transform">
                <span className="material-symbols-outlined text-9xl">settings_input_component</span>
              </div>
            </Link>

            {/* Category Card 2 */}
            <Link href="/categorias/herramientas" className="group relative aspect-square bg-surface-container-lowest rounded-xl overflow-hidden hover:bg-primary transition-colors duration-500 block">
              <div className="absolute inset-8 flex flex-col justify-between">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">construction</span>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-white transition-colors">Herramientas</h3>
                  <p className="text-xs font-label text-on-surface-variant group-hover:text-white/70 transition-colors mt-1">Manuales y eléctricas de alto torque</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-4 translate-y-4 opacity-10 group-hover:scale-150 transition-transform">
                <span className="material-symbols-outlined text-9xl">handyman</span>
              </div>
            </Link>

            {/* Category Card 3 */}
            <Link href="/categorias/iluminacion" className="group relative aspect-square bg-surface-container-lowest rounded-xl overflow-hidden hover:bg-primary transition-colors duration-500 block">
              <div className="absolute inset-8 flex flex-col justify-between">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">lightbulb</span>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-white transition-colors">Iluminación</h3>
                  <p className="text-xs font-label text-on-surface-variant group-hover:text-white/70 transition-colors mt-1">Industrial, comercial y LED técnica</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-4 translate-y-4 opacity-10 group-hover:scale-150 transition-transform">
                <span className="material-symbols-outlined text-9xl">wb_iridescent</span>
              </div>
            </Link>

            {/* Category Card 4 */}
            <Link href="/categorias/construccion" className="group relative aspect-square bg-surface-container-lowest rounded-xl overflow-hidden hover:bg-primary transition-colors duration-500 block">
              <div className="absolute inset-8 flex flex-col justify-between">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">foundation</span>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-white transition-colors">Construcción</h3>
                  <p className="text-xs font-label text-on-surface-variant group-hover:text-white/70 transition-colors mt-1">Fijación, herrajes y estructuras</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-4 translate-y-4 opacity-10 group-hover:scale-150 transition-transform">
                <span className="material-symbols-outlined text-9xl">architecture</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black tracking-tighter">Productos Destacados</h2>
            <p className="text-on-surface-variant font-light">Equipamiento de alto rendimiento seleccionado por expertos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Product 1 */}
            <div className="group">
              <div className="relative aspect-square mb-6 overflow-hidden bg-surface-container-highest rounded-xl">
                <img 
                  alt="High Torque Drill" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5m6TvDtLmWkqOqzgcMu7-YwxQ0COEW_ZxabLhHh_K9fAJWbquPwIeYxjQXL17aidSKW7JAoogQBEGLcXDSBXGaYmev64zgDrI3xFaShViRGlJwF0orEcrywI8obqVCq1pWro2Za7cJVtE1dOWrLC-aWDqNx1zUF7voPB5pQFDmfXus4TmjcEZKKQ-gRZPcatGMNPhvK5oEOhT7otUnVcpdu3w-iibKYRkNzvjne6Y3ooHcQRjdMLPZImV0pnqJE9oH29SHpi6NNVA"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">Pro Series</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">Taladro Industrial XR-500</h3>
                    <p className="text-sm font-label text-on-surface-variant">Herramientas Eléctricas</p>
                  </div>
                  <span className="text-xl font-black text-primary">$289.00</span>
                </div>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-dim transition-all flex items-center justify-center gap-2 group/btn">
                  <span className="material-symbols-outlined text-sm group-hover/btn:rotate-12 transition-transform">shopping_cart</span>
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group">
              <div className="relative aspect-square mb-6 overflow-hidden bg-surface-container-highest rounded-xl">
                <img 
                  alt="LED Fixture" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvmyqJwfkfSVosy-1Y0VMElya4y0kVYi8SGtThpsMbWcf146a9H-0qD8f4i3U2qwW5hTUH0a7_20ORuzELtOyHhURh3akR-2R6CJsQCll9D1iSAXbiCtdJgncUmJpI2LzeO3e411j7VraSPUgHzKv1qqUiFrbZ1h2e5gKmdGba7QqdWuNc85FFskaLxGNCVnacxcEY-0yfMuDdFn4J7WCpE_UazUy9x-R2XfPQm64Ww7FOm4dg9lTMamUH3fK8gnjb8VvfZihv1usq"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">Luminaria LED Loft Tech</h3>
                    <p className="text-sm font-label text-on-surface-variant">Iluminación</p>
                  </div>
                  <span className="text-xl font-black text-primary">$145.00</span>
                </div>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-dim transition-all flex items-center justify-center gap-2 group/btn">
                  <span className="material-symbols-outlined text-sm pt-0">shopping_cart</span>
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group">
              <div className="relative aspect-square mb-6 overflow-hidden bg-surface-container-highest rounded-xl">
                <img 
                  alt="Digital Multimeter" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpKFTavIdM5vu9l1IawMJGlPYheccCJgpfd4NIbfRQK5fNj_vdNiReeqMZ0WhyeSmWp1_9PfQYh1v59A-k3z_y_M7FihVvoaJLPylcOFTkMPVk5HCUpOsbskC8x5FONdHZuXrbHW4M--jynUd6sD4-JykGFywCyPgnJj9WtwvtFMSA8GtDDzKdQegUjxng4w8-4KLa2XOYiHZwL40KtQdCsA57Q1M2qrguoo0_R1ENk3RWq9K047S022evaLcEHj2y7Zu6WMujCG4g"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">Multímetro Digital Pro-Z</h3>
                    <p className="text-sm font-label text-on-surface-variant">Material Eléctrico</p>
                  </div>
                  <span className="text-xl font-black text-primary">$89.00</span>
                </div>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-dim transition-all flex items-center justify-center gap-2 group/btn">
                  <span className="material-symbols-outlined text-sm pt-0">shopping_cart</span>
                  Agregar al carrito
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
              </div>
              <h4 className="font-bold text-xl">Envíos rápidos</h4>
              <p className="text-on-surface-variant font-light text-sm max-w-[200px]">Logística optimizada para entregas en 24h a nivel nacional.</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
              </div>
              <h4 className="font-bold text-xl">Productos de calidad</h4>
              <p className="text-on-surface-variant font-light text-sm max-w-[200px]">Certificaciones internacionales en todo nuestro catálogo.</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
              </div>
              <h4 className="font-bold text-xl">Atención personalizada</h4>
              <p className="text-on-surface-variant font-light text-sm max-w-[200px]">Asesoría técnica experta para tus proyectos de ingeniería.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-surface-container-lowest overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              Impulsa tu <br/> <span className="text-primary text-stroke italic">próximo proyecto.</span>
            </h2>
            <p className="text-xl font-light text-on-surface-variant">Suscríbete para recibir catálogos técnicos y ofertas exclusivas para profesionales.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input className="flex-1 bg-surface-container border-none p-4 rounded-md font-label focus:ring-2 focus:ring-primary outline-none" placeholder="Tu correo electrónico" type="email" />
              <button className="px-10 py-4 bg-on-surface text-white font-bold rounded-md hover:bg-slate-800 transition-all">Unirse ahora</button>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[20rem] font-black italic tracking-tighter">RAYFORCE</span>
        </div>
      </section>
    </>
  );
}
