
import React, { useState } from 'react';
import { CartItem, CustomerDetails } from '../types';

interface CheckoutFormProps {
  cart: CartItem[];
  onSubmit: (details: CustomerDetails) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, onSubmit }) => {
  const [details, setDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    notes: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your basket is empty!");
    onSubmit(details);
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-stone-600">
            <span>Subtotal</span>
            <span>₦{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Delivery Fee</span>
            <span>₦{delivery.toFixed(2)}</span>
          </div>
          <div className="border-t border-stone-100 pt-3 flex justify-between font-bold text-xl text-stone-900">
            <span>Total</span>
            <span className="text-emerald-700">₦{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-6">Delivery Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Client Name</label>
            <input 
              required
              type="text" 
              value={details.name}
              onChange={e => setDetails({...details, name: e.target.value})}
              placeholder="e.g. Samuel Ade"
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">WhatsApp Identity</label>
            <input 
              required
              type="tel" 
              value={details.phone}
              onChange={e => setDetails({...details, phone: e.target.value})}
              placeholder="080 0000 0000"
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Order Notes (Optional)</label>
            <textarea 
              rows={2}
              value={details.notes}
              onChange={e => setDetails({...details, notes: e.target.value})}
              placeholder="e.g. Leave at the front gate"
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={cart.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-md transition-all active:scale-[0.98]"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            <span>Send Order via WhatsApp</span>
          </button>
          
          <p className="text-[10px] text-center text-stone-400 mt-4 leading-relaxed">
            By clicking the button, a WhatsApp message will be prepared with your order details and sent to our farm office.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
