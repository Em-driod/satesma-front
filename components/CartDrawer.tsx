
import React, { useState } from 'react';
import { CartItem, CustomerDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  onSubmit: (details: CustomerDetails) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, removeFromCart, updateQuantity, onSubmit }) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [details, setDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    notes: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className={`relative w-full max-w-md bg-stone-950 h-full flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] border-l border-white/5 transition-transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-stone-900/30">
          <div className="space-y-1">
            <h2 className="text-2xl font-light serif italic tracking-tight text-white">Your Selection</h2>
            <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-emerald-500">Premium Highland Estate</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 text-stone-500 hover:text-white transition-colors flex items-center justify-center">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-10 custom-scrollbar bg-gradient-to-b from-stone-950 to-stone-900">
          {step === 'cart' ? (
            cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-24 h-24 bg-white/5 text-emerald-500/30 rounded-full flex items-center justify-center animate-pulse">
                    <i className="fas fa-shopping-basket text-4xl"></i>
                </div>
                <div className="space-y-4">
                  <p className="text-white text-[11px] font-bold uppercase tracking-[0.4em]">The harvest basket is empty.</p>
                  <p className="text-stone-500 text-xs italic font-light max-w-[200px]">Begin your selection from our Olobi Compound inventory.</p>
                </div>
                <button onClick={onClose} className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.4em] border-b border-emerald-500/20 pb-2 hover:border-emerald-500 transition-all">Start Exploration</button>
              </div>
            ) : (
              <div className="space-y-12">
                {cart.map(item => (
                  <div key={item.id} className="flex space-x-8 group">
                    <div className="w-24 h-28 rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0 border border-white/10">
                        <img src={item.image} className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h4 className="font-bold text-base text-white">{item.name}</h4>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">₦{item.price.toFixed(2)} / {item.unit}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-stone-600 hover:text-red-500 transition-colors uppercase font-bold tracking-widest">Remove</button>
                      </div>
                      
                      <div className="flex items-center space-x-6 bg-white/5 border border-white/5 w-fit rounded-full px-5 py-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-stone-500 hover:text-white transition-colors">-</button>
                        <span className="text-[11px] font-bold w-4 text-center text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-stone-500 hover:text-white transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              <button onClick={() => setStep('cart')} className="text-[10px] text-stone-500 uppercase tracking-[0.4em] flex items-center mb-10 hover:text-white transition-colors font-bold">
                <i className="fas fa-arrow-left mr-3"></i> Return to items
              </button>
              <div className="space-y-10">
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.5em] text-stone-500 font-bold ml-1">Client Name</label>
                    <input 
                      required 
                      value={details.name}
                      placeholder="e.g. Samuel Ade"
                      onChange={e => setDetails({...details, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-stone-700 focus:border-emerald-500 outline-none transition-all font-light text-lg"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.5em] text-stone-500 font-bold ml-1">WhatsApp Identity</label>
                    <input 
                      required 
                      value={details.phone}
                      placeholder="080 0000 0000"
                      onChange={e => setDetails({...details, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-stone-700 focus:border-emerald-500 outline-none transition-all font-light text-lg"
                    />
                </div>
              </div>
            </form>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-10 bg-stone-900/50 border-t border-white/5 space-y-10">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-stone-500">Value Statement</span>
                <p className="text-[8px] text-stone-700 uppercase tracking-widest font-bold">Inc. Olobi Logistics</p>
              </div>
              <span className="text-4xl font-light serif italic text-white">₦{subtotal.toFixed(2)}</span>
            </div>
            
            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-white text-stone-950 py-6 rounded-full font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-emerald-500 hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button 
                form="checkout-form"
                type="submit"
                className="w-full bg-emerald-600 text-white py-6 rounded-full font-bold uppercase text-[10px] tracking-[0.5em] flex items-center justify-center space-x-4 hover:bg-emerald-500 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)]"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Finalize via WhatsApp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
