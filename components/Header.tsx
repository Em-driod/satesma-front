
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setIsBouncing(true);
      setShowFeedback(true);
      
      const timer = setTimeout(() => {
        setIsBouncing(false);
        setShowFeedback(false);
      }, 900);

      prevCount.current = cartCount;
      return () => clearTimeout(timer);
    } else {
      prevCount.current = cartCount;
    }
  }, [cartCount]);

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-home' },
    { name: 'Shop', path: '/shop', icon: 'fa-store' },
    { name: 'Our Story', path: '/our-story', icon: 'fa-book-open' },
    { name: 'Visit', path: '/find-us', icon: 'fa-map-marker-alt' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 overflow-hidden rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                  <img 
                    src="/logg.png" 
                    alt="Satesma Fountain Ventures" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-1 bg-emerald-400/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              </div>
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">Satesma</h1>
                <p className="text-xs text-gray-500">Fountain Ventures</p>
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold text-gray-900">Satesma</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <i className={`fas ${link.icon} text-sm`}></i>
                    <span>{link.name}</span>
                  </span>
                  {location.pathname === link.path && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Cart Button */}
              <div className="relative">
                {showFeedback && (
                  <div className="absolute -top-12 right-0 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce whitespace-nowrap">
                    Added to cart!
                  </div>
                )}
                
                <button 
                  onClick={onOpenCart}
                  className={`relative group flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isBouncing 
                      ? 'bg-emerald-600 text-white animate-bounce' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span className="hidden sm:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="container mx-auto px-6 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <i className={`fas ${link.icon} text-sm w-5`}></i>
                  <span>{link.name}</span>
                  {location.pathname === link.path && (
                    <i className="fas fa-check text-emerald-600 text-sm ml-auto"></i>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
