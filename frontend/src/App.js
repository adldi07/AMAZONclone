import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SearchResultsPage from './pages/SearchResultsPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onSearch={setSearchQuery} />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
            <Route path="/order-confirmation/:orderId" element={<ProtectedRoute element={<OrderConfirmationPage />} />} />
            <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} />} />
            <Route path="/wishlist" element={<ProtectedRoute element={<WishlistPage />} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
