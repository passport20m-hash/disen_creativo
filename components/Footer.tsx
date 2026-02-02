
import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { ICONS as Icons } from '../constants';

interface FooterProps {
  config: SiteConfig;
  isAdmin: boolean;
  onUpdate: (c: SiteConfig) => void;
}

const Footer: React.FC<FooterProps> = ({ config, isAdmin, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'envio' | 'garantia' | 'faqs' | null>(null);

  const Modal = ({ title, content, onClose }: { title: string, content: any, onClose: () => void }) => (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4">
      <div className="bg-white rounded-[3rem] max-w-3xl w-full max-h-[85vh] overflow-y-auto p-12 shadow-3xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-4xl font-serif font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-900 text-5xl transition-colors">&times;</button>
        </div>
        <div className="text-slate-600 whitespace-pre-wrap leading-relaxed text-base font-light">
          {typeof content === 'string' ? content : content.map((f: any, i: number) => (
            <div key={i} className="mb-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-4 text-lg leading-tight">{f.q}</p>
              <p className="text-slate-500 font-light leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <footer id="footer-contact" className="bg-white text-slate-900 pt-32 pb-16 border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg">O</div>
              <span className="text-xl font-bold tracking-tight text-[#0f172a]">OFFI DISEÑO CREATIVO</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-12 text-base leading-relaxed font-light">
              OFFI DISEÑO CREATIVO, inspiramos productividad y bienestar.
            </p>
            <div className="flex gap-6">
              <a href={config.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all border border-slate-200 shadow-sm text-slate-400"><Icons.Instagram /></a>
              <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all border border-slate-200 shadow-sm text-slate-400"><Icons.Facebook /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-400 uppercase text-[11px] tracking-[0.3em] mb-10">NAVEGACIÓN</h4>
            <ul className="space-y-6 text-slate-600 text-sm font-normal">
              <li><button onClick={() => setActiveTab('envio')} className="hover:text-slate-900 transition-colors">Políticas de Envío</button></li>
              <li><button onClick={() => setActiveTab('garantia')} className="hover:text-slate-900 transition-colors">Garantía ODC</button></li>
              <li><button onClick={() => setActiveTab('faqs')} className="hover:text-slate-900 transition-colors">Preguntas Frecuentes</button></li>
            </ul>
          </div>
          
          <div id="contacto">
            <h4 className="font-bold text-slate-400 uppercase text-[11px] tracking-[0.3em] mb-10">CONTACTO OFICIAL</h4>
            <div className="space-y-10 text-slate-600">
              <div className="flex flex-col gap-2">
                <span className="text-slate-300 font-bold tracking-widest text-[9px] uppercase">UBICACIÓN</span>
                <p className="text-slate-900 text-sm font-medium">{config.address}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-300 font-bold tracking-widest text-[9px] uppercase">TELÉFONO</span>
                <p className="text-[#0f172a] font-serif italic font-medium text-2xl tracking-tight">{config.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-300 font-bold tracking-widest text-[9px] uppercase">EMAIL</span>
                <p className="text-slate-900 text-sm font-medium">{config.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'envio' && <Modal title="Políticas de Envío" content={config.shippingPolicy} onClose={() => setActiveTab(null)} />}
      {activeTab === 'garantia' && <Modal title="Garantía ODC" content={config.warrantyPolicy} onClose={() => setActiveTab(null)} />}
      {activeTab === 'faqs' && <Modal title="Preguntas Frecuentes" content={config.faqs} onClose={() => setActiveTab(null)} />}
    </footer>
  );
};

export default Footer;
