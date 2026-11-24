import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function GameDetails() {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?id=${encodeURIComponent(dealId)}`
        );
        const data = await res.json();
        setDeal(data.gameInfo);

        const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(saved.some((item) => item.dealId === dealId));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [dealId]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = saved.filter((item) => item.dealId !== dealId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const updated = [
        ...saved,
        {
          dealId,
          name: deal.name,
          thumb: deal.thumb,
          salePrice: deal.salePrice,
          retailPrice: deal.retailPrice,
        },
      ];
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(true);
    }
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-16">Carregando detalhes...</p>;
  }

  if (!deal) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 mb-4">Oferta não encontrada.</p>
        <Link to="/" className="text-emerald-400 underline">
          Voltar para ofertas
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-slate-400 hover:text-emerald-400 mb-6 inline-block">
        ← Voltar para ofertas
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="md:flex">
          <img
            src={deal.thumb}
            alt={deal.name}
            className="w-full md:w-72 h-56 md:h-auto object-cover bg-slate-800"
          />
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-2xl font-bold text-white">{deal.name}</h1>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-300">
                {deal.metacriticScore > 0 && (
                  <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-amber-400">
                    Metacritic: {deal.metacriticScore}/100
                  </span>
                )}
                {deal.steamRatingText && (
                  <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-sky-400">
                    Steam: {deal.steamRatingText} ({deal.steamRatingPercent}%)
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-sm text-slate-500 line-through block">
                  De: ${deal.retailPrice}
                </span>
                <span className="text-3xl font-bold text-emerald-400">
                  ${deal.salePrice}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleFavorite}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm border transition cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
                  }`}
                >
                  {isFavorite ? '♥ Favoritado' : '♡ Favoritar'}
                </button>
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${dealId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-sm transition"
                >
                  Ver na Loja ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}