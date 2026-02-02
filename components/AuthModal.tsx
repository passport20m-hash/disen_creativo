
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const MASTER_KEY = 'OFFI2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_KEY) {
      onLogin({
        id: 'admin-id',
        email: 'info@offidiseno.com',
        name: 'Administrador OFFI',
        isAdmin: true,
        purchasedProductIds: []
      });
      setError('');
    } else {
      setError('Contraseña incorrecta. Solo el dueño tiene acceso.');
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Acceso Privado</h2>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-8">Ingresa la clave de gestión</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold tracking-[0.5em] focus:ring-2 ring-indigo-500/20 outline-none" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-center text-[10px] text-red-500 font-bold uppercase">{error}</p>}
          
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all">Acceder</button>
            <button type="button" onClick={onClose} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200">Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
