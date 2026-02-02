
import React, { useState, useRef, useEffect } from 'react';
import { Message, Product, SiteConfig } from '../types';
import { getDesignAdvice } from '../services/geminiService';
import { ICONS } from '../constants';

// Added interface for component props
interface AIConsultantProps {
  products: Product[];
  config: SiteConfig;
}

// Updated component to receive products and config as props
const AIConsultant: React.FC<AIConsultantProps> = ({ products, config }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy tu asesor experto. Puedo generar imágenes realistas de cómo lucirá tu oficina ideal basándome en tus especificaciones y nuestros diseños. ¿Qué tienes en mente para tu nuevo espacio de trabajo?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Fixed: getDesignAdvice returns a Message object, so we spread it directly.
    const advice = await getDesignAdvice([...messages, userMessage], products, config);
    setMessages(prev => [...prev, advice]);
    setIsLoading(false);
  };

  return (
    <section id="asesor" className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400">
                <ICONS.Sparkles />
              </div>
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">Innovación</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Diseña tu oficina con nuestra <span className="italic text-indigo-300">Inteligencia Artificial</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
              Describe el espacio de trabajo que imaginas y genera visualizaciones reales de cómo lucirán nuestros muebles en tu oficina según tus especificaciones.
            </p>
            <ul className="space-y-4 mb-8">
              {['Visualización fotorrealista', 'Diseño a medida', 'Selección de acabados premium'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-3xl flex flex-col h-[600px]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-slate-200">Asesor de Diseño Virtual</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/10'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-slate-200 px-4 py-3 rounded-2xl text-sm italic flex gap-2 border border-white/10">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe tu oficina ideal..."
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all pr-16"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-500 transition-colors disabled:opacity-50"
                >
                  <ICONS.ChevronRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
