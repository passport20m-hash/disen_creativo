
import React, { useState, useRef } from 'react';
import { SiteConfig, Product } from '../types';

interface AdminPanelProps {
  config: SiteConfig;
  onUpdateConfig: (c: SiteConfig) => void;
  products: Product[];
  onUpdateProducts: (p: Product[]) => void;
  categories: string[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, onUpdateConfig, products, onUpdateProducts, categories }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'products'>('config');
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: categories[0],
    imageUrl: '',
    features: []
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFeatures = Array.isArray(formData.features) 
      ? formData.features 
      : (formData.features as any || '').split(',').map((f: string) => f.trim()).filter(Boolean);

    if (editingId) {
      const updated = products.map(p => p.id === editingId ? { ...p, ...formData, features: finalFeatures } as Product : p);
      onUpdateProducts(updated);
      alert("Mueble actualizado con éxito.");
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        category: formData.category || categories[0],
        imageUrl: formData.imageUrl || 'https://picsum.photos/seed/offi/800/600',
        isManufacturedByUs: true,
        features: finalFeatures
      };
      onUpdateProducts([...products, newProduct]);
      alert("Producto agregado al catálogo.");
    }

    setEditingId(null);
    setFormData({ name: '', description: '', price: 0, category: categories[0], imageUrl: '', features: [] });
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({ ...p });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-serif text-slate-900">Gestión de Fábrica</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Consola Administrativa</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setActiveTab('config')} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}>Configuración</button>
              <button onClick={() => setActiveTab('products')} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}>Catálogo</button>
            </div>
          </div>

          {activeTab === 'config' ? (
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Teléfono WhatsApp</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-indigo-500/20" value={config.phone} onChange={e => onUpdateConfig({...config, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Dirección Planta</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-indigo-500/20" value={config.address} onChange={e => onUpdateConfig({...config, address: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400">Descripción Empresa (Para la IA)</label>
                <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-44 outline-none focus:ring-2 ring-indigo-500/20" value={config.companyDescription} onChange={e => onUpdateConfig({...config, companyDescription: e.target.value})} />
              </div>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSaveProduct} className="bg-slate-50 p-8 rounded-3xl mb-12 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-8">{editingId ? '🛠️ Editando Mueble' : '✨ Nuevo Mueble'}</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2 space-y-4">
                    <input placeholder="Nombre del Mueble" className="w-full p-4 rounded-xl border border-slate-200" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Precio" type="number" className="p-4 rounded-xl border border-slate-200" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})} required />
                      <select className="p-4 rounded-xl border border-slate-200 bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-white cursor-pointer hover:bg-slate-50 relative overflow-hidden h-40" onClick={() => fileInputRef.current?.click()}>
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-slate-400 text-[10px] font-bold uppercase">Subir Foto</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </div>
                </div>
                <textarea placeholder="Descripción del producto..." className="w-full p-4 rounded-xl border border-slate-200 h-24 mb-6" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all">{editingId ? 'Guardar Cambios' : 'Añadir al Catálogo'}</button>
                  {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({}); }} className="px-8 py-4 bg-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-[10px]">Cancelar</button>}
                </div>
              </form>

              <div className="grid md:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="p-4 border border-slate-100 rounded-2xl bg-white shadow-sm flex flex-col group">
                    <img src={p.imageUrl} className="w-full h-32 object-cover rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all" alt={p.name} />
                    <p className="font-bold text-slate-900 text-sm mb-1 truncate">{p.name}</p>
                    <p className="text-xs text-indigo-600 font-bold mb-4">${p.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Editar</button>
                      <button onClick={() => onUpdateProducts(products.filter(item => item.id !== p.id))} className="px-3 py-2 bg-rose-50 text-rose-500 rounded-lg text-[9px] font-bold uppercase hover:bg-rose-500 hover:text-white transition-all">Borrar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
