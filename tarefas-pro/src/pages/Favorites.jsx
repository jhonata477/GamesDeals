import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  const removeFavorite = (dealId) => {
    const updated = favorites.filter((item) => item.dealId !== dealId);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Meus Jogos Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl">
          <p className="text-slate-400 mb-3">Você ainda não favoritou nenhuma oferta.</p>
          <Link to="/" className="text-emerald-400 hover:underline font-medium">
            Explorar promoções
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div
              key={item.dealId}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img
                  src={item.thumb}
                  alt={item.name}
                  className="w-full h-36 object-cover bg-slate-800"
                />
                <div className="p-4">
                  <Link
                    to={`/jogo/${encodeURIComponent(item.dealId)}`}
                    className="text-white font-semibold hover:text-emerald-400 line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-emerald-400 font-bold mt-2">${item.salePrice}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => removeFavorite(item.dealId)}
                  className="w-full py-1.5 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-medium transition cursor-pointer"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}