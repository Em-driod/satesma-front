
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void }> = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-semibold rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-900">{product.name}</h3>
          <span className="text-emerald-700 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-stone-400 text-xs italic">Per {product.unit}</span>
          <button 
            onClick={handleAdd}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              isAdded 
              ? 'bg-amber-500 text-white scale-105' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <i className={`fas ${isAdded ? 'fa-check' : 'fa-plus'}`}></i>
            <span>{isAdded ? 'Added' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <i className="fas fa-seedling text-stone-300 text-6xl mb-4"></i>
        <h2 className="text-xl font-medium text-stone-500">No products available right now.</h2>
        <p className="text-stone-400">Check back later for fresh harvest!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Our Fresh Harvest</h1>
          <p className="text-stone-500">Straight from our fields to your kitchen.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
