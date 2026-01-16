import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import HeroBanner from '../components/HeroBanner';
import CategoryProductListing from '../components/CategoryProductListing';

function HomePage({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    loadProducts();
  }, [category, searchQuery]);

  // if URL has ?category=..., use it to override initial category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setCategory(cat);
  }, [location.search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await fetchProducts(category, searchQuery);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <HeroBanner />
      
      {category === 'all' && !searchQuery && <CategoryProductListing />}
      
      <CategoryFilter category={category} setCategory={setCategory} />
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {!loading && products.length === 0 && (
        <p>No products found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  }
};

export default HomePage;
