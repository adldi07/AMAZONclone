import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? '/api'
    : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api'),
  withCredentials: true // CRITICAL: Send cookies with every request
});

// Auth APIs (no token management needed - cookies are automatic!)
export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');
export const checkAuth = () => API.get('/auth/check');
export const getProfile = () => API.get('/auth/profile');

// Product APIs
export const fetchProducts = (category, search) =>
  API.get('/products', { params: { category, search } });
export const fetchProductById = (id) => API.get(`/products/${id}`);
// note: categories are provided via a static list in the frontend (no endpoint call)

// Cart APIs
export const getCart = () => API.get('/cart');
export const addToCart = async (productId, quantity) => {
  const res = await API.post('/cart', { productId, quantity });
  try {
    const cartRes = await API.get('/cart');
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartRes.data }));
  } catch (err) {
    // silent
  }
  return res;
};

export const updateCartItem = async (itemId, quantity) => {
  const res = await API.put(`/cart/${itemId}`, { quantity });
  try {
    const cartRes = await API.get('/cart');
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartRes.data }));
  } catch (err) {
    // silent
  }
  return res;
};

export const removeCartItem = async (itemId) => {
  const res = await API.delete(`/cart/${itemId}`);
  try {
    const cartRes = await API.get('/cart');
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartRes.data }));
  } catch (err) {
    // silent
  }
  return res;
};

// Order APIs
export const createOrder = (shipping) => API.post('/orders', { shipping });
export const getMyOrders = () => API.get('/orders/myorders');
export const getOrderById = (orderId) => API.get(`/orders/${orderId}`);

// Wishlist APIs
export const getWishlist = () => API.get('/wishlist');
export const addToWishlist = (productId) => API.post('/wishlist', { productId });
export const removeFromWishlist = (productId) => API.delete(`/wishlist/${productId}`);
