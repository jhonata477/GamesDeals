import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-emerald-400 tracking-tight">
          🎮 GameDeals
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-emerald-400 transition">
            Ofertas
          </Link>
          <Link to="/favoritos" className="hover:text-emerald-400 transition">
            Favoritos
          </Link>
        </nav>
      </div>
    </header>
  );
}