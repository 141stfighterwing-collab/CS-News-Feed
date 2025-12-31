
import React from 'react';
import { AIInsights } from '../types';

interface ThreatMeterProps {
  insights: AIInsights | null;
}

const ThreatMeter: React.FC<ThreatMeterProps> = ({ insights }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'Moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-green-500 bg-green-500/10 border-green-500/30';
    }
  };

  const getMeterWidth = (level: string) => {
    switch (level) {
      case 'Critical': return 'w-full';
      case 'High': return 'w-3/4';
      case 'Moderate': return 'w-1/2';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="glass border border-cyber-border rounded-xl p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Global Status</h2>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getLevelColor(insights?.threatLevel || 'Low')}`}>
          {insights?.threatLevel || 'SECURE'}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2 uppercase">
          <span>Active Risk</span>
          <span>{insights?.threatLevel === 'Critical' ? '98%' : insights?.threatLevel === 'High' ? '75%' : insights?.threatLevel === 'Moderate' ? '45%' : '12%'}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-1000 ease-out rounded-full ${getMeterWidth(insights?.threatLevel || 'Low')} ${insights?.threatLevel === 'Critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-cyber-accent shadow-[0_0_10px_rgba(0,242,255,0.5)]'}`}></div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">AI Pulse Summary</h3>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "{insights?.summary || 'Scanning global vectors for anomalies...'}"
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Emerging Vectors</h3>
          <div className="flex flex-wrap gap-2">
            {insights?.topTrends.map((trend, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-1 bg-cyber-border text-slate-300 rounded hover:text-cyber-accent transition-colors cursor-default">
                {trend}
              </span>
            )) || <span className="text-xs text-slate-600">Pending ingest...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMeter;
