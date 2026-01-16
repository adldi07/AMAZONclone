import React from 'react';

function CartItem({ item, selected = true, onSelect, onUpdate, onRemove }) {
  const decrease = () => {
    if (item.quantity > 1) onUpdate(item.id, item.quantity - 1);
  };
  const increase = () => onUpdate(item.id, item.quantity + 1);

  const discount = 58; // Example discount percentage
  const mrp = parseFloat(item.price) * 1.2;

  return (
    <div style={styles.item}>
      <div style={styles.topRow}>
        <input
          type="checkbox"
          checked={!!selected}
          onChange={onSelect}
          style={{ marginRight: 16, width: 20, height: 20, cursor: 'pointer' }}
        />
        <div style={styles.imageContainer}>
          <img
            src={item.product.image}
            alt={item.product.name}
            style={styles.image}
          />
        </div>

        <div style={styles.mainContent}>
          <h3 style={styles.title}>{item.product.name}</h3>
          <div style={styles.statusSection}>
            <span style={styles.inStock}>In stock</span>
            <span style={styles.fulfilled}>a Fulfilled</span>
          </div>

          <div style={styles.dealSection}>
            <span style={styles.dealBadge}>Republic Day Deal</span>
            <span style={styles.discount}>-{discount}%</span>
            <span style={styles.price}>₹{item.price}</span>
          </div>

          <div style={styles.mrpSection}>
            <span style={styles.mabel}>M.R.P:</span>
            <span style={styles.mrp}>₹{mrp.toLocaleString()}</span>
          </div>

          <p style={styles.promoText}>Buy 2 items, get 4% off Shop items</p>

          <p style={styles.deliveryText}>FREE delivery Sun, 18 Jan available at checkout</p>

          <div style={styles.optionsSection}>
            <label style={styles.optionLabel}>
              <input type="checkbox" /> This will be a gift <span style={styles.learnMore}>Learn more</span>
            </label>
          </div>

          <div style={styles.controlsRow}>
            <div style={styles.pill}>
              <button onClick={() => onRemove(item.id)} style={styles.trashBtn}>🗑️</button>
              <button onClick={decrease} style={styles.pillBtn}>−</button>
              <div style={styles.pillValue}>{item.quantity}</div>
              <button onClick={increase} style={styles.pillBtn}>+</button>
            </div>

            <button onClick={() => onRemove(item.id)} style={styles.deleteLink}>Delete</button>
            <button style={styles.saveLink}>Save for later</button>
            <button style={styles.linkLike}>See more like this</button>
            <button style={styles.linkLike}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  item: {
    padding: '16px',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '4px',
    marginBottom: '16px',
    backgroundColor: 'white'
  },
  topRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start'
  },
  imageContainer: {
    minWidth: '140px'
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    background: '#f5f5f5',
    borderRadius: '4px',
    padding: '8px'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#0a0a0a',
    lineHeight: '1.4'
  },
  statusSection: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    alignItems: 'center'
  },
  inStock: {
    color: '#0f9d58',
    fontSize: '13px',
    fontWeight: '500'
  },
  fulfilled: {
    backgroundColor: '#f0f0f0',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
    color: '#555'
  },
  dealSection: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '8px'
  },
  dealBadge: {
    backgroundColor: '#c0111f',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '600'
  },
  discount: {
    backgroundColor: '#c0111f',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '600'
  },
  price: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#B12704'
  },
  mrpSection: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    marginBottom: '6px'
  },
  mabel: {
    fontSize: '12px',
    color: '#666'
  },
  mrp: {
    fontSize: '13px',
    color: '#666',
    textDecoration: 'line-through'
  },
  promoText: {
    fontSize: '12px',
    color: '#0f9d58',
    marginBottom: '6px'
  },
  deliveryText: {
    fontSize: '13px',
    color: '#0f9d58',
    marginBottom: '8px'
  },
  optionsSection: {
    marginBottom: '10px'
  },
  optionLabel: {
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  learnMore: {
    color: '#007185',
    textDecoration: 'none',
    fontSize: '12px'
  },
  controlsRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginTop: '12px'
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    background: 'white',
    border: '2px solid #ffd814',
    padding: '4px 8px',
    borderRadius: '24px'
  },
  trashBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '2px 4px'
  },
  pillBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    cursor: 'pointer'
  },
  pillValue: {
    minWidth: '24px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '14px'
  },
  deleteLink: {
    background: 'transparent',
    border: 'none',
    color: '#007185',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '0'
  },
  saveLink: {
    background: 'transparent',
    border: 'none',
    color: '#007185',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '0'
  },
  linkLike: {
    background: 'transparent',
    border: 'none',
    color: '#007185',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '0'
  }
};

export default CartItem;
