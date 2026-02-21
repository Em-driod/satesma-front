
import React, { useState } from 'react';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {
  const [filter, setFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Other'];

  // Include all products (including top products) in the main shop
  const shopProducts = products;
  
  const filtered = shopProducts
    .filter(p => filter === 'All' || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        
        {/* Shop Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-emerald-700">Fresh Harvest Collection</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            The Harvest 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
              Estate Collection
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our meticulously curated inventory from Olobi Compound. 
            Each product is harvested with care and delivered fresh to your doorstep.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search for fresh produce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                filter === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              {cat === 'All' ? 'All Products' : cat}
              <span className="ml-2 text-sm opacity-70">
                ({cat === 'All' ? products.length : products.filter(p => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-emerald-600">{filtered.length}</span> products
            {filter !== 'All' && ` in ${filter}`}
          </p>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, idx) => (
              <div key={product.id} className="group">
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {product.category}
                      </span>
                      {product.isTopProduct && (
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          TOP PICK
                        </span>
                      )}
                    </div>
                    
                    {/* Quick Add Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-white text-emerald-600 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-emerald-600 hover:text-white"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description || 'Fresh and premium quality produce from our farm.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-emerald-600">₦{product.price.toFixed(2)}</span>
                        <span className="text-gray-500 text-sm ml-1">/{product.unit}</span>
                      </div>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors transform hover:scale-105"
                      >
                        <i className="fas fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-search text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No products match "${searchTerm}"`
                : filter !== 'All' 
                  ? `No products in ${filter} category` 
                  : 'No products available'
              }
            </p>
            {(searchTerm || filter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('All');
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
