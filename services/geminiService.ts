
import { GoogleGenAI } from "@google/genai";
import { Message, Product, SiteConfig } from "../types";

export const getDesignAdvice = async (
  history: Message[], 
  products: Product[], 
  config: SiteConfig
): Promise<Message> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const lastMsg = history[history.length - 1].content.toLowerCase();
    const needsImage = lastMsg.includes('imagen') || lastMsg.includes('foto') || lastMsg.includes('diseña') || lastMsg.includes('mira') || lastMsg.includes('oficina');

    let generatedImageUrl = undefined;
    let quote = undefined;

    if (needsImage) {
      const productList = products.map(p => `- ${p.name}`).join("\n");
      const imgPrompt = `Crea una visualización de diseño de interiores profesional para una oficina en Bogotá. Estilo OFFI DISEÑO CREATIVO. Debe incluir: ${productList}. Calidad fotorrealista.`;

      const imgResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: imgPrompt }] }
      });

      for (const part of imgResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      const suggested = products.slice(0, 2); 
      quote = {
        items: suggested.map(p => ({ name: p.name, price: p.price })),
        total: suggested.reduce((acc, p) => acc + p.price, 0)
      };
    }

    const systemInstruction = `Eres el Consultor de Diseño de "OFFI DISEÑO CREATIVO", fabricantes en Bogotá.
Empresa: ${config.companyDescription}
Catálogo: ${products.map(p => p.name + ' ($' + p.price + ')').join(', ')}

Instrucciones:
- Responde siempre con elegancia y profesionalismo.
- Invita a visitar la fábrica en Bogotá.
- Si el cliente quiere comprar, dile que use el botón de WhatsApp del producto.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(m => ({ 
        role: m.role === 'assistant' ? 'model' : 'user', 
        parts: [{ text: m.content }] 
      })),
      config: { 
        systemInstruction,
        temperature: 0.7 
      }
    });

    return {
      role: 'assistant',
      content: response.text || "He analizado tu solicitud. ¿Cómo puedo ayudarte a diseñar tu espacio?",
      generatedImageUrl,
      quote
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      role: 'assistant', 
      content: "Lo siento, para activar mi inteligencia necesito que configures la API_KEY en el servidor de Vercel. Por ahora, puedo ayudarte con información general." 
    };
  }
};
