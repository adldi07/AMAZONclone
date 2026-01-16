import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../services/api';
import CartItem from '../components/CartItem';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data);
      // select all items by default
      if (data && data.items) setSelectedIds(new Set(data.items.map(i => i.id)));
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
      loadCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      loadCart();
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return '0.00';
    const total = cart.items.reduce((sum, item) => {
      if (!selectedIds || selectedIds.size === 0) return sum;
      if (!selectedIds.has(item.id)) return sum;
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);
    return total.toFixed(2);
  };

  if (loading) return <p style={styles.container}>Loading cart...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Shopping Cart</h1>

      {!cart?.items || cart.items.length === 0 ? (
        <div style={styles.empty}>
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} style={styles.shopButton}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div style={styles.contentRow}>
            <div style={styles.itemsColumn}>
              <div style={styles.selectAllRow}>
                <input
                  type="checkbox"
                  checked={cart.items && selectedIds && selectedIds.size === cart.items.length}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedIds(new Set(cart.items.map(i => i.id)));
                    else setSelectedIds(new Set());
                  }}
                  style={{marginRight: 8, width: 18, height: 18, cursor: 'pointer'}}
                />
                <span style={{marginLeft:0, fontSize: '15px', color: '#0a7a07'}}>
                  {selectedIds && selectedIds.size === cart.items.length ? 'Deselect all items' : 'Select all items'}
                </span>
              </div>
              <div style={styles.items}>
                {cart.items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    selected={selectedIds.has(item.id)}
                    onSelect={() => {
                      setSelectedIds(prev => {
                        const next = new Set(prev);
                        if (next.has(item.id)) next.delete(item.id);
                        else next.add(item.id);
                        return next;
                      });
                    }}
                    onUpdate={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            <aside style={styles.summaryColumn}>
              <div style={styles.summaryBox}>
                <div style={styles.freeDeliveryBox}>
                  <span style={styles.checkmark}>✓</span>
                  <div>
                    <p style={styles.freeDeliveryTitle}>Your order is eligible for FREE Delivery.</p>
                    <p style={styles.freeDeliveryText}>Choose FREE Delivery option at checkout.</p>
                  </div>
                </div>

                <div style={styles.summaryInner}>
                  <p style={styles.subtotal}>Subtotal ({selectedIds.size} items): <strong>₹{calculateTotal()}</strong></p>
                  <div style={{marginTop:16}}>
                    <input type="checkbox" id="gift" style={{width: 16, height: 16, cursor: 'pointer'}} /> 
                    <label htmlFor="gift" style={{marginLeft:10, fontSize: '14px'}}>This order contains a gift</label>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout')}
                    style={styles.proceedButton}
                  >
                    Proceed to Buy
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f3f4f6'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: '600',
    color: '#0a0a0a'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  shopButton: {
    marginTop: '20px',
    padding: '12px 30px',
    backgroundColor: '#FFD814',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  contentRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  itemsColumn: {
    flex: 1
  },
  selectAllRow: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: 'white',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.08)'
  },
  items: {
    marginBottom: '30px'
  },
  summaryColumn: {
    width: '340px',
    position: 'sticky',
    top: '20px'
  },
  summaryBox: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.08)'
  },
  freeDeliveryBox: {
    display: 'flex',
    gap: '12px',
    backgroundColor: '#eaf6eb',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
    alignItems: 'flex-start'
  },
  checkmark: {
    color: '#0f9d58',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '2px'
  },
  freeDeliveryTitle: {
    color: '#0f9d58',
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  freeDeliveryText: {
    color: '#0f9d58',
    fontSize: '13px',
    margin: '0'
  },
  summaryInner: {
    marginTop: '0'
  },
  subtotal: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0'
  },
  proceedButton: {
    marginTop: '16px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#ffd814',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '800',
    color: '#000'
  }
};

export default CartPage;
