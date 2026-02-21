
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  if (cart.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center">
        <i className="fas fa-shopping-basket text-stone-200 text-6xl mb-6"></i>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Your basket is empty</h2>
        <p className="text-stone-500">Add some fresh produce from the shop to start your order.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-stone-100">
        <h2 className="text-2xl font-bold text-stone-900">Your Basket</h2>
      </div>
      <div className="divide-y divide-stone-100">
        {cart.map(item => (
          <div key={item.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-stone-900">{item.name}</h3>
                <p className="text-stone-500 text-sm">${item.price.toFixed(2)} / {item.unit}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center bg-stone-100 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                >
                  <i className="fas fa-minus text-xs"></i>
                </button>
                <span className="w-10 text-center font-bold text-stone-800">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                >
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>
              
              <div className="text-right min-w-[80px]">
                <p className="font-bold text-emerald-800">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
