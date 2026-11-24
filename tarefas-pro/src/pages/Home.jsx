import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [deals, setDeals] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeals = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = query
        ? `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(query)}&pageSize=20`
        : `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=30&pageSize=20`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Erro ao buscar ofertas.');
      const data = await res.json();
      setDeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDeals = async (query = '') => {
      setLoading(true);
      setError(null);
      try {
        const url = query
          ? `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(query)}&pageSize=20`
          : `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=30&pageSize=20`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Erro ao buscar ofertas.');
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    fetchDeals(search);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Promoções de Jogos de PC
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Compare descontos em tempo real nas principais lojas digitais.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar jogo (ex: Batman, Portal)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold transition cursor-pointer"
          >
            Buscar
          </button>
        </form>
      </div>

      {loading && (
        <p className="text-center text-slate-400 py-12">Carregando ofertas...</p>
      )}

      {error && (
        <p className="text-center text-red-400 py-12">{error}</p>
      )}

      {!loading && !error && deals.length === 0 && (
        <p className="text-center text-slate-400 py-12">Nenhum jogo encontrado.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!loading &&
          deals.map((deal) => (
            <Link
              key={deal.dealID}
              to={`/jogo/${encodeURIComponent(deal.dealID)}`}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition flex flex-col justify-between group"
            >
              <div>
                <img
                  src={deal.thumb}
                  alt={deal.title}
                  className="w-full h-36 object-cover bg-slate-800 group-hover:scale-105 transition duration-300"
                />
                <div className="p-4">
                  <h2 className="text-white font-semibold line-clamp-2 group-hover:text-emerald-400 transition">
                    {deal.title}
                  </h2>
                  {deal.metacriticScore > 0 && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                      Metacritic: {deal.metacriticScore}
                    </span>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                  -{Math.round(deal.savings)}%
                </span>
                <div className="text-right">
                  <span className="text-xs text-slate-500 line-through block">
                    ${deal.normalPrice}
                  </span>
                  <span className="text-lg font-bold text-white">
                    ${deal.salePrice}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}