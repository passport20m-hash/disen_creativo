
import React from 'react';
import { ICONS } from '../constants';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
  isAdmin: boolean;
  onUpdate: (c: SiteConfig) => void;
}

const Hero: React.FC<HeroProps> = ({ config, isAdmin, onUpdate }) => {
  return (
    <section id="inicio" className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Office" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-start">
        <div className="max-w-2xl bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl text-left animate-in fade-in slide-in-from-left duration-700">
          
          {isAdmin ? (
            <div className="space-y-4 mb-8">
              <textarea 
                className="w-full bg-white/10 text-white border border-white/20 p-6 rounded-2xl text-3xl md:text-4xl font-serif text-left focus:outline-none"
                rows={3}
                value={config.heroTitle}
                onChange={e => onUpdate({...config, heroTitle: e.target.value})}
              />
              <input 
                className="w-full bg-white/10 text-white border border-white/20 p-4 rounded-xl text-lg font-light text-left focus:outline-none"
                value={config.heroSubtitle}
                onChange={e => onUpdate({...config, heroSubtitle: e.target.value})}
              />
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">
                {config.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-white/90 font-light mb-10 max-w-lg leading-relaxed">
                {config.heroSubtitle}
              </p>
            </>
          )}
          
          <div className="flex justify-start">
            <a href="#coleccion" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-slate-100 hover:scale-105 transition-all shadow-xl group">
              Explorar Catálogo
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                <ICONS.ChevronRight />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
