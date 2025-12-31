
import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-cyber-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyber-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)]">
            <svg className="w-6 h-6 text-cyber-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              CYBERSHIELD <span className="text-cyber-accent">INTEL</span>
            </h1>
            <p className="text-[10px] font-mono text-cyber-accent/60 tracking-widest uppercase">Global Threat Aggregator</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full md:w-96">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search threats, CVEs, or entities..."
            className="w-full bg-cyber-bg/50 border border-cyber-border rounded-full py-2 px-10 text-sm focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all font-mono"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </form>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-cyber-accent transition-colors">Feeds</a>
          <a href="#" className="hover:text-cyber-accent transition-colors">Threat Map</a>
          <a href="#" className="hover:text-cyber-accent transition-colors">CVE DB</a>
          <div className="w-[1px] h-4 bg-cyber-border"></div>
          <button className="bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 px-4 py-1.5 rounded-full text-xs hover:bg-cyber-accent/20 transition-all font-bold">
            ADMIN PANEL
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
