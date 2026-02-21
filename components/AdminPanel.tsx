
import React, { useState } from 'react';
import { Product } from '../types';
import { generateProductDescription } from '../services/gemini';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts }) => {
  const [token, setToken] = useState<string>(() => {
    // Clear any existing token to force re-login
    localStorage.removeItem('admin_token');
    return '';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Vegetables',
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/admin/login`, { username, password });
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description || "Freshly harvested produce.");
      formData.append('price', String(newProduct.price));
      formData.append('unit', newProduct.unit!);
      formData.append('category', newProduct.category!);
      formData.append('isTopProduct', String(newProduct.isTopProduct || false));

      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (newProduct.image) {
        formData.append('image', newProduct.image);
      } else {
        // Default image if nothing provided
        formData.append('image', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400');
      }

      const { data } = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Map _id to id for frontend
      const mapped = { ...data, id: data._id };
      setProducts(prev => [mapped, ...prev]);

      setNewProduct({ category: 'Vegetables', unit: 'kg', image: '', isTopProduct: false });
      setSelectedFile(null);
      setIsAdding(false);
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to remove this product?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleAiDescription = async () => {
    if (!newProduct.name) return alert("Please enter a product name first");
    setIsLoadingAi(true);
    const desc = await generateProductDescription(newProduct.name);
    setNewProduct(prev => ({ ...prev, description: desc }));
    setIsLoadingAi(false);
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-stone-200">
        <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">Admin Access</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <button onClick={handleLogout} className="text-stone-500 hover:text-stone-700 text-sm underline">Logout</button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
          <p className="text-stone-500 text-sm">Manage your store's inventory</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isAdding ? 'bg-stone-200 text-stone-700' : 'bg-emerald-600 text-white'}`}
        >
          {isAdding ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Product Name</label>
              <input
                required
                type="text"
                value={newProduct.name || ''}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="e.g. Heirloom Tomatoes"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Category</label>
              <select
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value as any })}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Dairy</option>
                <option>Grains</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={newProduct.price || ''}
                onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Unit</label>
              <input
                type="text"
                value={newProduct.unit || ''}
                onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
                placeholder="e.g. kg, Bunch, Tray"
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Product Image (File or URL)</label>
              <div className="space-y-2">
                <input
                  type="file"
                  onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <input
                  type="text"
                  placeholder="Or enter image URL..."
                  value={newProduct.image || ''}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="isTopProduct"
                checked={newProduct.isTopProduct || false}
                onChange={e => setNewProduct({ ...newProduct, isTopProduct: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="isTopProduct" className="text-sm font-bold text-stone-700">Mark as Top Product</label>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-stone-500 uppercase">Description</label>
              <button
                type="button"
                onClick={handleAiDescription}
                disabled={isLoadingAi}
                className="text-emerald-600 text-xs font-bold flex items-center space-x-1 hover:text-emerald-700 disabled:opacity-50"
              >
                <i className={`fas ${isLoadingAi ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i>
                <span>Use AI Helper</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={newProduct.description || ''}
              onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
            Save Product
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-semibold text-stone-800">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-stone-600">${p.price.toFixed(2)} / {p.unit}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 bg-stone-100 text-stone-600 rounded-md mr-2">{p.category}</span>
                  {p.isTopProduct && <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded-md">Top</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
