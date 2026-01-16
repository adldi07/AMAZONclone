import React, { useEffect, useState, useRef } from 'react';
import { fetchProducts } from '../services/api';

function CategoryProductListing() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const scrollRefs = useRef({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();
        // Group products by category
        const grouped = {};
        data.forEach(product => {
          const cat = product.category || 'Other';
          if (!grouped[cat]) {
            grouped[cat] = [];
          }
          grouped[cat].push(product);
        });
        setCategories(grouped);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load products:', err);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const scroll = (category, direction) => {
    const container = scrollRefs.current[category];
    if (container) {
      const scrollAmount = 300;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  if (loading) return <div style={styles.loading}>Loading categories...</div>;

  // Get featured products - one from each category
  const featuredProducts = [];
  Object.entries(categories).forEach(([category, products]) => {
    if (products.length > 0) {
      featuredProducts.push(products[0]);
    }
  });

  return (
    <div style={styles.container}>
      {/* Featured category cards */}
      <div style={styles.featuredSection}>
        <div style={styles.featuredGrid}>
          {featuredProducts.slice(0, 4).map((product) => (
            <div 
              key={product.id} 
              style={styles.posterCard}
              onClick={() => window.location.href = `/?category=${encodeURIComponent(product.category)}`}
            >
              <h3 style={styles.posterTitle}>{product.category}</h3>
              {product.image ? (
                <img src={product.image} alt={product.category} style={styles.posterImage} />
              ) : (
                <div style={styles.posterImagePlaceholder} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {Object.entries(categories).map(([category, products]) => (
        <div key={category} style={styles.categorySection}>
          <div style={styles.categoryHeader}>
            <h2 style={styles.categoryTitle}>
              Up to 70% off | {category}
            </h2>
            <a href={`/?category=${encodeURIComponent(category)}`} style={styles.seeAllLinkButton}>
              See all offers
            </a>
          </div>
          
          <div style={styles.scrollWrapper}>
            <button 
              style={styles.arrowButton} 
              onClick={() => scroll(category, 'left')}
              aria-label="Scroll left"
            >
              ‹
            </button>
            
            <div 
              style={styles.productScroll}
              ref={(el) => { scrollRefs.current[category] = el; }}
            >
              {products.slice(0, 6).map((product) => (
                <div key={product.id} style={styles.productBox}>
                  <div style={styles.imageContainer}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={styles.productImage} />
                    ) : (
                      <div style={styles.imagePlaceholder} />
                    )}
                  </div>
                  <div style={styles.productInfo}>
                    <p style={styles.productName}>{product.name}</p>
                    {product.price && (
                      <p style={styles.productPrice}>₹{product.price.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              style={styles.arrowButton} 
              onClick={() => scroll(category, 'right')}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px 12px',
    backgroundColor: '#ffffff',
    maxWidth: '100%',
  },
  
  // Featured section styles
  featuredSection: {
    paddingLeft: '12px',
    paddingRight: '12px',
    marginBottom: '40px',
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  posterCard: {
    background: 'white',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  posterTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  posterImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  posterImagePlaceholder: {
    width: '100%',
    height: '180px',
    background: 'linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)',
    borderRadius: '4px',
  },
  
  // Category section styles
  categorySection: {
    marginBottom: '32px',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  categoryTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  seeAllLinkButton: {
    color: '#0066c0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '8px 16px',
    border: '1px solid #0066c0',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  productScroll: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '8px',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  productScroll_webkit: {
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  scrollWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
  },
  arrowButton: {
    background: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    color: '#1f2937',
    fontSize: '24px',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  productBox: {
    flex: '0 0 calc(25% - 10px)',
    minWidth: '240px',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  imageContainer: {
    width: '100%',
    height: '160px',
    marginBottom: '12px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)',
  },
  productInfo: {
    paddingTop: '8px',
  },
  productName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 6px 0',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  productPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0066c0',
    margin: 0,
  },
  loading: {
    padding: '40px 20px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
};

export default CategoryProductListing;
