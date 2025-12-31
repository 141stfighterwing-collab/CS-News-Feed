
export enum NewsCategory {
  GENERAL = 'General',
  BREACH = 'Breach',
  RANSOMWARE = 'Ransomware',
  POLICY = 'Policy',
  EXPLOIT = 'Exploit',
  ECONOMICS = 'Economics'
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: NewsCategory;
  relevanceScore: number; // 0-100
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
}

export interface AIInsights {
  threatLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  topTrends: string[];
  summary: string;
}
