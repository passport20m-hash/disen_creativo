
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  isAdmin?: boolean;
  isAdminMode?: boolean;
  toggleAdminMode?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, isAdmin, isAdminMode, toggleAdminMode }) => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-24 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl">O</div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tighter text-slate-900 text-xl leading-none">OFFI</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-medium leading-none">DISEÑO CREATIVO</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          <a href="#inicio" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">INICIO</a>
          <a href="#coleccion" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">CATÁLOGO</a>
          <a href="#asesor" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">ASESOR IA</a>
          <button 
            onClick={() => document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' })} 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors"
          >
            CONTACTO
          </button>
          
          {isAdmin && (
            <button onClick={toggleAdminMode} className={`px-4 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all ${isAdminMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              PANEL ADMIN
            </button>
          )}

          <button onClick={onLoginClick} className="bg-[#0f172a] text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
            {user ? 'MI CUENTA' : 'ENTRAR'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
