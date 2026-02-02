
import React, { useState } from 'react';
import { CartItem, SiteConfig } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  config: SiteConfig;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, config }) => {
  const [step, setStep] = useState(1);
  const [shippingType, setShippingType] = useState<'bogota' | 'nacional'>('bogota');
  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white h-full shadow-3xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-8 border-b flex justify-between items-center bg-slate-950 text-white">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
             <h2 className="text-xl font-serif font-bold">Resumen de Compra</h2>
          </div>
          <button onClick={onClose} className="text-3xl text-white/60 hover:text-white transition-colors">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-32 space-y-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-4xl opacity-20">🛒</div>
                  <p className="text-slate-400 font-light italic">Tu carrito está esperando por tu próximo escritorio.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center bg-slate-50 p-4 rounded-3xl border border-slate-100 group">
                    <img src={item.imageUrl} className="w-20 h-20 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-400 mb-2">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-600">${item.price.toLocaleString()}</span>
                        <span className="text-[10px] bg-white px-2 py-1 rounded-full border">Cant: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">Información de Envío</h3>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-8">
                  <button type="button" onClick={() => setShippingType('bogota')} className={`py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${shippingType === 'bogota' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>🚚 Bogotá (Propio)</button>
                  <button type="button" onClick={() => setShippingType('nacional')} className={`py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${shippingType === 'nacional' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>📦 Nacional</button>
                </div>
                
                <div className="space-y-4">
                  <input placeholder="Nombre Completo" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 ring-indigo-500/20 focus:outline-none transition-all" required />
                  <input placeholder="Dirección en Bogotá / Ciudad" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 ring-indigo-500/20 focus:outline-none transition-all" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Celular" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 ring-indigo-500/20 focus:outline-none transition-all" required />
                    <input placeholder="Barrio / Sector" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 ring-indigo-500/20 focus:outline-none transition-all" required />
                  </div>
                </div>
                
                {shippingType === 'nacional' && (
                  <div className="mt-6 p-5 bg-indigo-50 text-indigo-700 text-[10px] rounded-2xl font-medium leading-relaxed border border-indigo-100">
                    <span className="font-bold block mb-1">Nota Nacional:</span>
                    Trabajamos con <strong>Coordinadora, Envía o Inter Rapidísimo</strong>. Te enviaremos la guía de rastreo en cuanto el mueble salga de planta.
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="p-8 border-t bg-slate-50 rounded-t-[3rem] shadow-inner">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold block mb-1">Subtotal</span>
              <span className="text-3xl font-serif font-bold text-slate-900">${total.toLocaleString()} <span className="text-sm font-sans font-light text-slate-400">COP</span></span>
            </div>
            {step === 2 && (
               <div className="text-right">
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">IVA Incluido</span>
               </div>
            )}
          </div>
          
          {step === 1 ? (
            <button 
              disabled={cart.length === 0}
              onClick={() => setStep(2)}
              className="w-full py-5 bg-slate-950 text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:scale-100 shadow-xl"
            >
              Continuar al Pago
            </button>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={() => alert("Redirigiendo a Pasarela de Pago Segura (PSE/Wompi)...")}
                className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-500 hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Pagar con PSE / Tarjeta
                <img src="https://static.pse.com.co/banner-pse/pse-logo-white.png" className="h-4" alt="PSE" />
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-600"
              >
                Volver al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
