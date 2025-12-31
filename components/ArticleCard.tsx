
import React from 'react';
import { NewsArticle, NewsCategory } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const getCategoryColor = (cat: NewsCategory) => {
    switch (cat) {
      case NewsCategory.BREACH: return 'bg-red-500/20 text-red-400 border-red-500/30';
      case NewsCategory.RANSOMWARE: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case NewsCategory.POLICY: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case NewsCategory.EXPLOIT: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case NewsCategory.ECONOMICS: return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score > 80) return 'text-cyber-accent';
    if (score > 50) return 'text-cyber-warning';
    return 'text-gray-400';
  };

  return (
    <div className="group relative glass rounded-xl overflow-hidden border border-cyber-border hover:border-cyber-accent/50 transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${getRelevanceColor(article.relevanceScore)}`}>
              Match: {article.relevanceScore}%
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-cyber-accent transition-colors">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>

        <p className="text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.keywords.map((kw, i) => (
            <span key={i} className="text-[10px] font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded">
              #{kw.toLowerCase()}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-cyber-border flex justify-between items-center text-xs text-slate-500 font-mono">
          <span>{article.source}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[150%] h-[2px] bg-cyber-accent/20 rotate-45 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default ArticleCard;
