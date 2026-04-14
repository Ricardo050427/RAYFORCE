import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md font-headline antialiased tracking-tight">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
          Rayforce
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-primary font-bold border-b-2 border-primary pb-1">Inicio</Link>
          <Link href="/productos" className="text-slate-600 hover:text-slate-900 transition-colors">Productos</Link>
          <Link href="/categorias" className="text-slate-600 hover:text-slate-900 transition-colors">Categorías</Link>
          <Link href="/nosotros" className="text-slate-600 hover:text-slate-900 transition-colors">Nosotros</Link>
          <Link href="/contactos" className="text-slate-600 hover:text-slate-900 transition-colors">Contactos</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container border-none focus:ring-2 focus:ring-primary rounded-lg text-sm w-64 outline-none" 
              placeholder="Buscar componentes..." 
              type="text"
            />
          </div>
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-all active:opacity-80 active:scale-95 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
