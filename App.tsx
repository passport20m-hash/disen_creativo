
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import AIConsultant from './components/AIConsultant';
import FloatingChat from './components/FloatingChat';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { PRODUCTS } from './constants';
import { Product, User, SiteConfig } from './types';

const INITIAL_CONFIG: SiteConfig = {
  heroTitle: "DISEÑAMOS EL ESPACIO DONDE NACEN TUS GRANDES IDEAS",
  heroSubtitle: "Creamos muebles con alma en el corazón de Bogotá. Piezas pensadas para que disfrutes cada minuto de tu jornada en un entorno que te inspire de verdad.",
  companyDescription: "En OFFI DISEÑO CREATIVO somos fabricantes expertos en Bogotá. Creamos entornos de trabajo que inspiran productividad y bienestar. Fabricamos escritorios en madera y metal, y sillas ergonómicas de alta gama.",
  phone: "+57 312 456 7890",
  address: "Bogotá, Colombia - Calle del Diseño Industrial",
  email: "gerencia@offidiseno.com",
  instagramUrl: "https://instagram.com/offidiseno",
  facebookUrl: "https://facebook.com/offidiseno",
  stats: [
    { value: "15+", label: "Años de Trayectoria" },
    { value: "100%", label: "Manufactura Local" },
    { value: "5000", label: "Proyectos Entregados" }
  ],
  shippingPolicy: `Entregas en Bogotá en 24-48 horas con personal propio. Envíos nacionales por transportadoras líderes.`,
  warrantyPolicy: `Garantía de 5 años en estructuras y 2 años en componentes móviles.`,
  faqs: [
    { q: "¿Hacen muebles a medida?", a: "Sí, podemos ajustar dimensiones y acabados." },
    { q: "¿Cómo compro?", a: "Contáctanos por WhatsApp para formalizar tu pedido y pago seguro." }
  ]
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('offi_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  const [categories] = useState<string[]>(["Escritorios", "Sillas", "Accesorios"]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('offi_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    localStorage.setItem('offi_products', JSON.stringify(products));
    localStorage.setItem('offi_config', JSON.stringify(siteConfig));
  }, [products, siteConfig]);

  return (
    <div className={`min-h-screen bg-white ${isAdminMode ? 'ring-8 ring-indigo-500/10 ring-inset' : ''}`}>
      <Navbar 
        user={currentUser} 
        cartCount={0}
        onCartClick={() => {}}
        onLoginClick={() => setShowAuthModal(true)} 
        isAdmin={currentUser?.isAdmin}
        // Added isAdminMode prop to fix variable access in Navbar
        isAdminMode={isAdminMode}
        toggleAdminMode={() => setIsAdminMode(!isAdminMode)}
      />
      
      <main>
        <Hero config={siteConfig} isAdmin={isAdminMode} onUpdate={setSiteConfig} />
        
        {/* Estadísticas Rápidas */}
        <section className="py-24 bg-white border-b border-slate-50">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="text-6xl font-light text-slate-900 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Catálogo de Muebles */}
        <section id="coleccion" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-md">
                <h2 className="text-5xl font-serif text-slate-900 mb-6">Muebles de Autor</h2>
                <p className="text-slate-500 font-light text-base leading-relaxed">Diseñados y fabricados con la precisión del diseño industrial y la calidez del trabajo artesano en Bogotá.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Todos", ...categories].map(c => (
                  <button 
                    key={c}
                    onClick={() => setFilter(c)} 
                    className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${filter === c ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.filter(p => filter === 'Todos' || p.category === filter).map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  isAdmin={isAdminMode}
                  whatsappNumber={siteConfig.phone}
                  onSelect={setSelectedProduct}
                  onDelete={() => setProducts(products.filter(item => item.id !== p.id))}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Asesor IA Personalizado */}
        <AIConsultant products={products} config={siteConfig} />
        
        {/* Gestión del Dueño */}
        {isAdminMode && (
          <AdminPanel 
            config={siteConfig} 
            onUpdateConfig={setSiteConfig}
            products={products}
            onUpdateProducts={setProducts}
            categories={categories}
          />
        )}
      </main>
      
      <Footer config={siteConfig} isAdmin={isAdminMode} onUpdate={setSiteConfig} />
      
      {/* Herramientas Flotantes */}
      <FloatingChat products={products} config={siteConfig} />
      
      {/* Modales y Ventanas */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLogin={(user) => { setCurrentUser(user); setShowAuthModal(false); }} 
        />
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          whatsappNumber={siteConfig.phone}
        />
      )}
      
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;