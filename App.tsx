
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Product, CartItem, CustomerDetails } from './types';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import OurStory from './pages/OurStory';
import FindUs from './pages/FindUs';
import AdminPanel from './components/AdminPanel';
import CartDrawer from './components/CartDrawer';
import axios from 'axios';

const API_URL = 'https://satesma-back.onrender.com/api';



const FARMER_WHATSAPP = "2348056623864";

// Scroll reveal observer
const ScrollReveal: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));

    window.scrollTo(0, 0);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      // Map _id to id for frontend compatibility
      const mapped = data.map((p: any) => ({ ...p, id: p._id }));
      setProducts(mapped);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('farm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);



  useEffect(() => {
    localStorage.setItem('farm_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleSendOrder = (details: CustomerDetails) => {
    const cartSummary = cart.map(item => `${item.name} x${item.quantity} (${(item.price * item.quantity).toFixed(2)})`).join('%0A');
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    const message = `*SATESMA FOUNTAIN VENTURES ORDER*%0A%0A` +
      `*Client:* ${details.name}%0A` +
      `*Items:*%0A${cartSummary}%0A%0A` +
      `*Total Value:* ₦${total}%0A%0A` +
      (details.notes ? `*Client Notes:* ${details.notes}` : '');

    window.open(`https://wa.me/${FARMER_WHATSAPP}?text=${message}`, '_blank');
    setCart([]);
    setIsCartOpen(false);
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <Router>
      <ScrollReveal />
      <div className="min-h-screen flex flex-col">
        <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          onSubmit={handleSendOrder}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
            <Route path="/shop" element={<Shop products={products} onAddToCart={addToCart} />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/find-us" element={<FindUs />} />
            <Route path="/admin" element={<div className="container mx-auto px-6 py-24"><AdminPanel products={products} setProducts={setProducts} /></div>} />
          </Routes>
        </main>

        <footer className="bg-emerald-950 text-stone-500 py-32 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
              <div className="max-w-md space-y-10">
                <h3 className="text-white text-4xl font-bold serif italic tracking-tighter">Satesma Fountain Ventures</h3>
                <p className="text-lg leading-relaxed opacity-60 font-light">
                  Production of farm products, cash crops and animal husbandry. From Olobi Compound to your table, we provide 24/7 service.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-emerald-950 transition-all duration-500"><i className="fab fa-whatsapp"></i></a>
                  <a href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-emerald-950 transition-all duration-500"><i className="fab fa-facebook-f"></i></a>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
                <div className="space-y-6">
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">The Venture</h4>
                  <ul className="space-y-4 text-sm tracking-wide">
                    <li><a href="/#/shop" className="hover:text-white transition-all">Collections</a></li>
                    <li><a href="/#/our-story" className="hover:text-white transition-all">Our Story</a></li>
                    <li><a href="/#/find-us" className="hover:text-white transition-all">Visit Us</a></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">Connect</h4>
                  <ul className="space-y-4 text-sm tracking-wide">
                    <li><a href="tel:08056623864" className="hover:text-white transition-all">08056623864</a></li>
                    <li><a href="mailto:satesmafountainventures@gmail.com" className="hover:text-white transition-all">Email Us</a></li>
                    <li><a href="#" className="hover:text-white transition-all">WhatsApp</a></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">Information</h4>
                  <ul className="space-y-4 text-sm tracking-wide">
                    <li><a href="#" className="hover:text-white transition-all">Privacy</a></li>
                    <li><a href="#" className="hover:text-white transition-all">Terms of Service</a></li>
                    <li><Link to="/admin" className="hover:text-white transition-all text-emerald-500/50 hover:text-emerald-500">Admin Access</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-32 pt-10 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.5em] font-bold text-white/30">
              <p>© 2024 Satesma Fountain Ventures</p>
              <p>Olobi Compound, Ladugba, Asa LG</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
