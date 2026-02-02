
import React from 'react';
import { Product } from '../types';
import { ICONS } from '../constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  whatsappNumber: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, whatsappNumber }) => {
  if (!product) return null;

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(`Hola OFFI DISEÑO CREATIVO, quiero más detalles sobre el mueble: ${product.name}. ¿Me pueden asesorar?`);
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-3xl animate-in zoom-in-95 duration-400 max-h-[90vh] flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/90 text-white hover:text-slate-900 rounded-full flex items-center justify-center text-3xl transition-all backdrop-blur-md">&times;</button>
        
        <div className="md:w-3/5 bg-slate-100 relative overflow-hidden group">
          <img src={product.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={product.name} />
          {product.isManufacturedByUs && (
            <div className="absolute bottom-8 left-8 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <ICONS.Factory />
              Auténtico OFFI Diseño
            </div>
          )}
        </div>
        
        <div className="md:w-2/5 p-10 md:p-16 flex flex-col justify-center bg-white overflow-y-auto">
          <div className="mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 block mb-4">Fabricantes en Bogotá</span>
            <h2 className="text-4xl font-serif text-slate-900 mb-6 leading-tight">{product.name}</h2>
            <div className="text-3xl font-serif font-bold text-slate-900 mb-8">${product.price.toLocaleString()} COP</div>
            <div className="h-px w-20 bg-slate-200 mb-8"></div>
            <p className="text-slate-500 text-base leading-relaxed font-light mb-10">{product.description}</p>
            
            <div className="space-y-4 mb-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Características Técnicas:</p>
              <ul className="grid grid-cols-1 gap-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Consultar Disponibilidad
              <ICONS.ChevronRight />
            </button>
            <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest font-bold">Despachos inmediatos en Bogotá y alrededores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
