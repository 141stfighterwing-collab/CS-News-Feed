
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ThreatMeter from './components/ThreatMeter';
import { fetchCyberNews } from './services/geminiService';
import { NewsArticle, AIInsights } from './types';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async (query?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCyberNews(query);
      setArticles(data.articles);
      setInsights(data.insights);
    } catch (err: any) {
      setError(err.message || "Failed to synchronize with intelligence feeds.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
    // Refresh every 15 minutes
    const interval = setInterval(() => loadNews(), 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadNews]);

  const handleSearch = (query: string) => {
    loadNews(query);
  };

  return (
    <div className="min-h-screen bg-cyber-bg font-sans selection:bg-cyber-accent selection:text-cyber-bg overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
        <div className="scanline"></div>
      </div>

      <Header onSearch={handleSearch} isLoading={isLoading} />

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        
        {/* Alerts / Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-sm font-mono">{error}</div>
            <button onClick={() => loadNews()} className="ml-auto underline hover:text-white">Retry Handshake</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Feed Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-mono font-bold text-cyber-accent uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyber-accent animate-pulse"></span>
                Intelligence Ingest
              </h2>
              <div className="text-[10px] font-mono text-slate-500">
                ACTIVE_NODES: 12 | LATENCY: 42ms | SYNC: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {isLoading && articles.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-64 glass border border-cyber-border rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center glass rounded-xl border border-cyber-border">
                <div className="text-slate-500 font-mono mb-2 text-sm uppercase">Zero results found for query</div>
                <button onClick={() => loadNews()} className="text-cyber-accent text-xs font-bold hover:underline">RESET FEED</button>
              </div>
            )}
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-8">
            <ThreatMeter insights={insights} />
            
            <div className="glass border border-cyber-border rounded-xl p-6">
               <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Filters</h2>
               <div className="space-y-2">
                 {['Critical Breaches', '0-Day Advisories', 'Ransomware Trends', 'Global Policy', 'Semiconductor Supply'].map(filter => (
                   <button 
                    key={filter}
                    onClick={() => handleSearch(filter)}
                    className="w-full text-left px-3 py-2 text-xs text-slate-400 border border-transparent hover:border-cyber-accent/30 hover:bg-cyber-accent/5 rounded-lg transition-all font-mono group flex justify-between items-center"
                   >
                     <span>{filter}</span>
                     <span className="opacity-0 group-hover:opacity-100 text-cyber-accent">→</span>
                   </button>
                 ))}
               </div>
            </div>

            <div className="glass border border-cyber-border rounded-xl p-6 bg-gradient-to-br from-cyber-primary/10 to-transparent">
              <h2 className="text-xs font-mono font-bold text-cyber-primary uppercase tracking-widest mb-3">System Note</h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                This console is aggregating OSINT data via Gemini 3 Flash. Relevance scoring is determined by semantic proximity to NIST/CISA frameworks.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-primary"></div>
                <div className="text-[10px] font-mono text-cyber-primary">SYSTEM READY</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-cyber-border glass">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            © 2024 CYBERSHIELD INTEL // SECURED BY GEMINI AI
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-slate-500 uppercase font-bold">
            <a href="#" className="hover:text-cyber-accent transition-colors">API ACCESS</a>
            <a href="#" className="hover:text-cyber-accent transition-colors">OSINT SOURCES</a>
            <a href="#" className="hover:text-cyber-accent transition-colors">TERMINAL MODE</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
