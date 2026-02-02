
import React from 'react';
import { Product } from '../types';
import { ICONS } from '../constants';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onDelete?: () => void;
  whatsappNumber: string;
  onSelect?: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onDelete, whatsappNumber, onSelect }) => {
  const handleWhatsAppRedirect = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que abra el modal al dar clic al botón
    const message = encodeURIComponent(`Hola OFFI DISEÑO CREATIVO, estoy interesado en el producto: ${product.name}. Me gustaría recibir más información.`);
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div 
      onClick={() => onSelect?.(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
           <span className="bg-white/90 text-slate-900 text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 backdrop-blur-md">Ver Detalle</span>
        </div>
        {product.isManufacturedByUs && (
          <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[9px] uppercase tracking-tighter px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md">
            <ICONS.Factory />
            <span>Fabricación Directa</span>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">{product.category}</span>
          <span className="text-xl font-serif font-bold text-slate-900">${product.price.toLocaleString()}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-6 leading-relaxed font-light">{product.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {product.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="text-[9px] font-bold uppercase tracking-widest bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100">
              {feature}
            </span>
          ))}
        </div>
        
        <button 
          onClick={handleWhatsAppRedirect}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-md active:scale-95"
        >
          Consultar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
