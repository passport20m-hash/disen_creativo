
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/50 skew-x-12 translate-x-32"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">¿Tienes un proyecto corporativo en mente?</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-lg leading-relaxed">
              Como fabricantes directos, ofrecemos soluciones personalizadas para oficinas de todos los tamaños. Solicita una visita técnica o una cotización para grandes volúmenes.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-indigo-400 text-sm">📍</span>
                </div>
                <span className="text-sm uppercase tracking-widest font-bold">Showroom Bogotá - Calle del Diseño</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-indigo-400 text-sm">📞</span>
                </div>
                <span className="text-sm uppercase tracking-widest font-bold">+57 312 456 7890</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada. Un asesor técnico te contactará pronto.'); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-indigo-500" placeholder="Nombre completo" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Empresa</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-indigo-500" placeholder="Nombre de la empresa" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                <input type="email" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-indigo-500" placeholder="tu@email.com" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mensaje</label>
                <textarea className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm h-32 focus:outline-indigo-500" placeholder="Cuéntanos qué necesitas para tu espacio..." required></textarea>
              </div>
              <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl">
                Enviar Solicitud Técnica
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
