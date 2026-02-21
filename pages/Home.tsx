
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const featured = products.filter(p => p.isTopProduct).slice(0, 4);
  const categories = ['all', 'vegetables', 'fruits', 'dairy', 'grains'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products.slice(0, 8)
    : products.filter(p => p.category.toLowerCase() === activeCategory).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      
      {/* Hero Section - Light & Airy */}
      <section className="relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-emerald-700">Fresh From The Farm</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Satesma 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                  Fountain Ventures
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience the finest harvest from Olobi Compound. 
                Premium produce, artisanal quality, delivered with love from our family farm to your table.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/shop" 
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  to="/our-story" 
                  className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800" 
                  alt="Fresh Produce" 
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-leaf text-emerald-600"></i>
                    <span className="text-sm font-semibold text-gray-800">100% Organic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-sun',
                title: '24/7 Harvest',
                description: 'Fresh produce available around the clock for your convenience'
              },
              {
                icon: 'fa-seedling',
                title: 'Premium Quality',
                description: 'Carefully cultivated using traditional farming methods'
              },
              {
                icon: 'fa-truck',
                title: 'Quick Delivery',
                description: 'From our farm to your doorstep in record time'
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center space-y-4 group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className={`fas ${feature.icon} text-2xl text-emerald-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Harvest</h2>
              <p className="text-xl text-gray-600">Handpicked selections from our premium collection</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map((product, idx) => (
                <div key={product.id} className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      TOP PICK
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-emerald-600 font-bold">₦{product.price.toFixed(2)}/{product.unit}</p>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="mt-2 w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-xl text-gray-600">Explore our diverse range of fresh produce</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="group">
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-700">{product.category}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-emerald-600 font-bold">₦{product.price.toFixed(2)}/{product.unit}</p>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-2 w-full bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-amber-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience Freshness?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of satisfied customers who enjoy the finest produce from Satesma Fountain Ventures.
          </p>
          <Link 
            to="/shop" 
            className="inline-block px-8 py-4 bg-white text-emerald-600 font-semibold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
