
import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, NewsCategory, AIInsights } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchCyberNews = async (query: string = "latest cybersecurity news, breaches, and ransomware"): Promise<{ articles: NewsArticle[], insights: AIInsights }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for the latest and most impactful cybersecurity news related to: "${query}". 
      Return the data in a structured JSON format following this schema:
      - articles: Array of objects with title, summary, source, url, publishedAt, category (one of: General, Breach, Ransomware, Policy, Exploit, Economics), relevanceScore (0-100), sentiment (positive, negative, neutral), and 3 keywords.
      - insights: An object with threatLevel (Low, Moderate, High, Critical), topTrends (list of 3-5 strings), and a brief overall summary of the current landscape.
      
      Ensure you use Google Search grounding for accuracy.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            articles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  source: { type: Type.STRING },
                  url: { type: Type.STRING },
                  publishedAt: { type: Type.STRING },
                  category: { type: Type.STRING },
                  relevanceScore: { type: Type.NUMBER },
                  sentiment: { type: Type.STRING },
                  keywords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "summary", "source", "url", "category", "relevanceScore"]
              }
            },
            insights: {
              type: Type.OBJECT,
              properties: {
                threatLevel: { type: Type.STRING },
                topTrends: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                summary: { type: Type.STRING }
              },
              required: ["threatLevel", "topTrends", "summary"]
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    
    // Add IDs for React keys
    const articlesWithIds = (data.articles || []).map((a: any, idx: number) => ({
      ...a,
      id: `${Date.now()}-${idx}`
    }));

    return {
      articles: articlesWithIds,
      insights: data.insights || { threatLevel: 'Low', topTrends: [], summary: 'No data available.' }
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
