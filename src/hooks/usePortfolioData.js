import { useState, useEffect } from 'react';

let cache = null;

export function usePortfolioData() {
  const [data, setData] = useState(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;
    fetch('/data/portfolio.json')
      .then(r => { if (!r.ok) throw new Error('Failed to load'); return r.json(); })
      .then(d => { cache = d; setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return { data, loading, error };
}
