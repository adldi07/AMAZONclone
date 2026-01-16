import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/api';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
      // small non-blocking notification
      const el = document.createElement('div');
      el.innerText = 'Added to cart';
      el.style.position = 'fixed';
      el.style.bottom = '20px';
      el.style.right = '20px';
      el.style.background = '#232F3E';
      el.style.color = 'white';
      el.style.padding = '10px 14px';
      el.style.borderRadius = '6px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div 
      style={styles.card}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div style={styles.media}>
        <img 
          src={product.image} 
          alt={product.name}
          style={styles.image}
        />
      </div>

      <div style={styles.info}>
        <div style={styles.name} title={product.name}>{product.name}</div>
        <div style={styles.price}>₹{product.price}</div>
        <div style={styles.bottomRow}>
          <div style={styles.rating}>⭐ {product.rating}</div>
          <button 
            onClick={handleAddToCart}
            style={styles.button}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '8px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  media: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '220px',
    background: 'linear-gradient(180deg, #fff, #fafafa)'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '200px',
    objectFit: 'contain'
  },
  info: {
    paddingTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  name: {
    fontSize: '15px',
    lineHeight: '1.2',
    height: '38px',
    overflow: 'hidden',
    color: '#111'
  },
  price: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#B12704'
  },
  rating: {
    color: '#FFA41C',
    fontWeight: '600'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#ffd814',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700'
  }
};

export default ProductCard;
