
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, appetizing, 2-sentence marketing description for a farm-fresh product named "${productName}". Focus on quality, freshness, and health. Do not use hashtags or emojis.`,
    });
    return response.text || "Freshly picked and ready for your table.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Premium quality farm produce, freshly harvested and packed with care.";
  }
};
