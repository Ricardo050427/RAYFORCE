import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 w-full border-t border-slate-200 font-headline text-sm tracking-wide">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="font-bold text-slate-900 uppercase text-lg">Rayforce</div>
          <p className="text-slate-500 max-w-xs leading-relaxed">
            Distribuidor líder en componentes eléctricos y hardware de precisión. Tecnología al servicio de la industria.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3 flex flex-col">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2">Social</span>
            <a className="text-slate-500 hover:text-primary transition-colors" href="#">Instagram</a>
            <a className="text-slate-500 hover:text-primary transition-colors" href="#">LinkedIn</a>
          </div>
          <div className="space-y-3 flex flex-col">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2">Legal</span>
            <Link className="text-slate-500 hover:text-primary transition-colors" href="/legales/privacidad">Privacy Policy</Link>
            <Link className="text-slate-500 hover:text-primary transition-colors" href="/legales/terminos">Terms of Service</Link>
          </div>
        </div>
        
        <div className="space-y-4">
          <span className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2 block">Soporte</span>
          <a className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-sm">mail</span>
            Contact Support
          </a>
          <div className="pt-4 text-slate-400 text-xs">
            © {new Date().getFullYear()} Rayforce. Precision Engineering.
          </div>
        </div>
      </div>
    </footer>
  );
}
