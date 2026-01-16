import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchProducts, addToCart } from '../services/api';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    selectedBrands: [],
    minRating: 0,
  });

  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts('all', searchQuery);
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [searchQuery]);

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
      // Show success message or toast
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        backgroundColor: #28a745;
        color: white;
        padding: 16px 24px;
        borderRadius: 4px;
        zIndex: 1000;
        boxShadow: 0 2px 8px rgba(0,0,0,0.2);
      `;
      toast.textContent = 'Added to cart!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const inPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesBrand = filters.selectedBrands.length === 0 || 
      filters.selectedBrands.some(brand => product.name?.toLowerCase().includes(brand.toLowerCase()));
    const matchesRating = (product.rating || 0) >= filters.minRating;
    return inPriceRange && matchesBrand && matchesRating;
  });

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters({
      ...filters,
      priceRange: [filters.priceRange[0], value],
    });
  };

  const handleBrandToggle = (brand) => {
    setFilters({
      ...filters,
      selectedBrands: filters.selectedBrands.includes(brand)
        ? filters.selectedBrands.filter(b => b !== brand)
        : [...filters.selectedBrands, brand],
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.resultCount}>
          1-{Math.min(24, filteredProducts.length)} of {filteredProducts.length} results for <span style={styles.searchTerm}>"{searchQuery}"</span>
        </p>
      </div>

      <div style={styles.mainContent}>
        {/* Left Sidebar - Filters */}
        <div style={styles.sidebar}>
          {/* Price Filter */}
          <div style={styles.filterSection}>
            <h3 style={styles.filterTitle}>Price</h3>
            <div style={styles.priceRange}>
              <span style={styles.priceLabel}>₹{filters.priceRange[0].toLocaleString()}</span>
              <input
                type="range"
                min="0"
                max="100000"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                style={styles.slider}
              />
              <span style={styles.priceLabel}>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Brands Filter */}
          <div style={styles.filterSection}>
            <h3 style={styles.filterTitle}>Brands</h3>
            {['Apple', 'Samsung', 'Sony', 'Dell', 'HP'].map((brand) => (
              <label key={brand} style={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          {/* Rating Filter */}
          <div style={styles.filterSection}>
            <h3 style={styles.filterTitle}>Rating</h3>
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} style={styles.checkbox}>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  onChange={() => setFilters({ ...filters, minRating: rating })}
                />
                <span>{"⭐".repeat(rating)} & Up</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Content - Results */}
        <div style={styles.results}>
          {loading ? (
            <p style={styles.loading}>Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p style={styles.noResults}>No products found</p>
          ) : (
            filteredProducts.slice(0, 24).map((product) => (
              <div 
                key={product.id} 
                style={styles.productCard}
                onClick={() => handleProductClick(product.id)}
              >
                <div style={styles.productImageContainer}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={styles.productImage} />
                  ) : (
                    <div style={styles.imagePlaceholder} />
                  )}
                </div>
                <div style={styles.productDetails}>
                  <h3 style={styles.brand}>{product.category || 'Product'}</h3>
                  <h2 style={styles.title}>{product.name}</h2>
                  
                  <div style={styles.ratingContainer}>
                    <span style={styles.stars}>
                      {'⭐'.repeat(Math.round(product.rating || 4))}
                    </span>
                    <span style={styles.reviewCount}>({product.reviews || 0})</span>
                  </div>

                  <p style={styles.boughtText}>1K+ bought in past month</p>

                  <div style={styles.dealBadge}>Republic Day Deal</div>

                  <div style={styles.priceContainer}>
                    <span style={styles.price}>₹{product.price?.toLocaleString() || 'N/A'}</span>
                    <span style={styles.mrp}>M.R.P: ₹{(product.price * 1.2)?.toLocaleString()}</span>
                    <span style={styles.discount}>(5% off)</span>
                  </div>

                  <p style={styles.delivery}>FREE delivery Mon, 19 Jan</p>

                  <button 
                    style={styles.addToCartBtn}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '16px',
  },
  resultCount: {
    fontSize: '14px',
    color: '#565959',
    margin: 0,
  },
  searchTerm: {
    fontWeight: 'bold',
    color: '#0f1111',
  },
  mainContent: {
    display: 'flex',
    gap: '20px',
  },
  sidebar: {
    width: '250px',
    paddingRight: '20px',
    borderRight: '1px solid #e5e7eb',
  },
  filterSection: {
    marginBottom: '24px',
  },
  filterTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f1111',
    margin: '0 0 12px 0',
  },
  priceRange: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  priceLabel: {
    fontSize: '12px',
    color: '#565959',
  },
  slider: {
    width: '100%',
    cursor: 'pointer',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#0f1111',
  },
  results: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  productCard: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
  },
  productImageContainer: {
    width: '200px',
    height: '200px',
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)',
  },
  productDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  brand: {
    fontSize: '13px',
    color: '#0066c0',
    margin: '0 0 4px 0',
    fontWeight: '600',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0f1111',
    margin: '0 0 8px 0',
    lineHeight: '1.3',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  stars: {
    fontSize: '14px',
  },
  reviewCount: {
    fontSize: '12px',
    color: '#565959',
  },
  boughtText: {
    fontSize: '12px',
    color: '#565959',
    margin: '4px 0',
  },
  dealBadge: {
    display: 'inline-block',
    backgroundColor: '#d32f2f',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    marginBottom: '8px',
    width: 'fit-content',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '8px',
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f1111',
  },
  mrp: {
    fontSize: '13px',
    color: '#565959',
    textDecoration: 'line-through',
  },
  discount: {
    fontSize: '13px',
    color: '#b12a2a',
    fontWeight: '600',
  },
  delivery: {
    fontSize: '13px',
    color: '#0f8419',
    fontWeight: '500',
    marginBottom: '12px',
  },
  addToCartBtn: {
    backgroundColor: '#ffc107',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '24px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '13px',
    width: 'fit-content',
    transition: 'all 0.2s ease',
  },
  loading: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#565959',
  },
  noResults: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#565959',
  },
};

export default SearchResultsPage;
