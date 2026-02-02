
import React, { useState, useRef, useEffect } from 'react';
import { Message, Product, SiteConfig } from '../types';
import { getDesignAdvice } from '../services/geminiService';
import { ICONS as Icons } from '../constants';

const FloatingChat: React.FC<{ products: Product[], config: SiteConfig }> = ({ products, config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `¡Hola! Soy tu asesor virtual. Como fabricantes en Bogotá, puedo diseñar tu espacio perfecto. Pídeme una "foto" de tu oficina ideal.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    const reply = await getDesignAdvice([...messages, userMsg], products, config);
    setMessages(prev => [...prev, reply]);
    setIsLoading(false);
  };

  const handleWhatsAppQuote = (quote: any) => {
    const items = quote.items.map((i: any) => `- ${i.name}`).join('%0A');
    const message = encodeURIComponent(`Hola OFFI DISEÑO CREATIVO, el asesor de IA me sugirió este diseño y presupuesto estimado de $${quote.total.toLocaleString()} COP que incluye:%0A${items}%0A%0AMe gustaría concretar este proyecto.`);
    window.open(`https://wa.me/${config.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      {isOpen && (
        <div className="w-80 md:w-96 h-[550px] bg-white rounded-[2.5rem] shadow-3xl flex flex-col border border-slate-200 overflow-hidden mb-6 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-slate-950 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-[10px] tracking-[0.2em] uppercase">Asistente de Diseño</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors text-2xl">&times;</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-xs leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none'}`}>
                  {m.content}
                </div>
                
                {m.generatedImageUrl && (
                  <div className="mt-4 rounded-3xl overflow-hidden border border-slate-200 shadow-xl max-w-full bg-white group">
                    <img src={m.generatedImageUrl} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" alt="Sugerencia de Diseño" />
                    <div className="p-5 bg-slate-950 text-white">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-3">Presupuesto Estimado (Catálogo ODC):</p>
                      <div className="space-y-2">
                        {m.quote?.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[10px] border-b border-white/10 pb-1">
                            <span className="font-light">{item.name}</span>
                            <span className="font-bold">${item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-indigo-500/30 flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase">Total Estimado:</span>
                        <span className="text-sm font-serif font-bold text-indigo-300">${m.quote?.total.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => handleWhatsAppQuote(m.quote)}
                        className="w-full mt-4 py-2 bg-indigo-600 text-white text-[9px] font-bold uppercase rounded-xl hover:bg-indigo-500 transition-colors"
                      >
                        Solicitar este diseño por WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-3 bg-slate-100 rounded-2xl w-fit animate-pulse">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full delay-75"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full delay-150"></div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          
          <form onSubmit={handleSend} className="p-6 border-t bg-white">
            <div className="relative group">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Diseña mi oficina minimalista..."
                className="w-full pl-6 pr-14 py-4 bg-slate-100 rounded-2xl text-xs focus:outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-slate-950 text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all disabled:opacity-50"
              >
                <Icons.Sparkles />
              </button>
            </div>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-950 text-white rounded-3xl shadow-3xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all active:scale-95 group relative"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white animate-ping"></span>
        <Icons.Sparkles />
      </button>
    </div>
  );
};

export default FloatingChat;
