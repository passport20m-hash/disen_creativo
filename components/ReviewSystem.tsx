
import React, { useState } from 'react';
import { Review, User, Product } from '../types';

interface ReviewSystemProps {
  reviews: Review[];
  products: Product[];
  user: User | null;
  isAdmin: boolean;
  onAddReview: (r: Review) => void;
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ reviews, products, user, isAdmin, onAddReview, onApproveReview, onDeleteReview }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState('');

  const publicReviews = reviews.filter(r => r.status === 'approved');
  const pendingReviews = reviews.filter(r => r.status === 'pending');

  const canReview = user && user.purchasedProductIds.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      productId: selectedProduct,
      userId: user!.id,
      userName: user!.name,
      rating,
      comment,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    onAddReview(newReview);
    setComment('');
    alert("Reseña enviada. Aparecerá cuando el administrador la apruebe.");
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif mb-12">Lo que dicen nuestros clientes</h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Listado de Reseñas */}
          <div className="lg:col-span-2 space-y-6">
            {publicReviews.length === 0 ? (
              <p className="text-slate-400 italic">Aún no hay reseñas aprobadas.</p>
            ) : (
              publicReviews.map(r => (
                <div key={r.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-900">{r.userName}</span>
                    <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-2">{r.comment}</p>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Sobre: {products.find(p => p.id === r.productId)?.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Formulario de Reseña */}
          <div>
            {canReview ? (
              <form onSubmit={handleSubmit} className="p-8 bg-slate-900 text-white rounded-3xl sticky top-24">
                <h3 className="text-xl font-bold mb-6">Deja tu opinión</h3>
                <div className="space-y-4">
                  <select 
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm focus:outline-none"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                  >
                    <option value="" className="text-slate-900">Selecciona producto comprado</option>
                    {user!.purchasedProductIds.map(id => (
                      <option key={id} value={id} className="text-slate-900">
                        {products.find(p => p.id === id)?.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2 justify-center py-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setRating(n)} className={`text-2xl ${rating >= n ? 'text-yellow-400' : 'text-white/20'}`}>★</button>
                    ))}
                  </div>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm h-32 focus:outline-none"
                    placeholder="Tu experiencia..."
                    required
                  />
                  <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">
                    Enviar para Aprobación
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 bg-slate-50 rounded-3xl text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-500 text-sm italic">
                  Solo clientes que han realizado una compra pueden dejar reseñas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Panel Administrativo de Reseñas */}
        {isAdmin && pendingReviews.length > 0 && (
          <div className="mt-20 p-8 border-4 border-indigo-500/20 rounded-3xl">
            <h3 className="text-xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></span>
              Moderación de Reseñas Pendientes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {pendingReviews.map(r => (
                <div key={r.id} className="p-4 bg-white border border-indigo-100 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-xs">{r.userName}</span>
                      <span className="text-yellow-500 text-xs">{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4 italic">"{r.comment}"</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onApproveReview(r.id)} className="flex-1 py-2 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600">APROBAR</button>
                    <button onClick={() => onDeleteReview(r.id)} className="flex-1 py-2 bg-rose-500 text-white text-[10px] font-bold rounded-lg hover:bg-rose-600">RECHAZAR</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSystem;
