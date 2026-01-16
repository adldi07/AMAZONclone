import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, getCart } from '../services/api';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    if (!cart?.items) return '0.00';
    return cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.pincode || !shipping.phone) {
      alert('Please fill all fields');
      return;
    }
    try {
      setPlacing(true);
      const { data } = await createOrder(shipping);
      navigate(`/order-confirmation/${data.orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Checkout</h1>

      <div style={styles.contentRow}>
        {/* Left Column - Address Form */}
        <div style={styles.formColumn}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Shipping Address</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={shipping.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Street Address *</label>
                <textarea
                  name="address"
                  placeholder="House No., Building Name"
                  value={shipping.address}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                />
              </div>

              <div style={styles.rowGroup}>
                <div style={styles.halfColumn}>
                  <label style={styles.label}>City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shipping.city}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.halfColumn}>
                  <label style={styles.label}>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="6 digit code"
                    value={shipping.pincode}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10 digit phone number"
                  value={shipping.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <button 
                type="submit" 
                style={{...styles.button, opacity: placing ? 0.6 : 1}}
                disabled={placing}
              >
                {placing ? 'Placing Order...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div style={styles.summaryColumn}>
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.itemsList}>
              {cart?.items && cart.items.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <div>
                    <p style={styles.itemName}>{item.product.name}</p>
                    <p style={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div style={styles.divider} />

            <div style={styles.pricingSection}>
              <div style={styles.pricingRow}>
                <span>Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div style={styles.pricingRow}>
                <span>Shipping</span>
                <span style={{color: '#0f9d58'}}>FREE</span>
              </div>
              <div style={styles.pricingRow}>
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
              <div style={{...styles.pricingRow, ...styles.totalRow}}>
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <div style={styles.freeDeliveryBox}>
              <span style={styles.checkmark}>✓</span>
              <div>
                <p style={styles.freeDeliveryTitle}>Your order is eligible for FREE Delivery</p>
                <p style={styles.freeDeliveryText}>Delivery by Sun, 18 Jan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    marginBottom: '30px',
    fontWeight: '600',
    color: '#0a0a0a'
  },
  contentRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  formColumn: {
    flex: 1
  },
  section: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#0a0a0a'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#0a0a0a'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #bbb',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #bbb',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '70px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  rowGroup: {
    display: 'flex',
    gap: '16px'
  },
  halfColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    padding: '12px',
    backgroundColor: '#FFD814',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '10px',
    color: '#000'
  },
  summaryColumn: {
    width: '360px',
    position: 'sticky',
    top: '20px'
  },
  summaryBox: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.08)'
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#0a0a0a'
  },
  itemsList: {
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '16px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    marginBottom: '12px',
    borderBottom: '1px solid rgba(0,0,0,0.08)'
  },
  itemName: {
    fontSize: '13px',
    fontWeight: '500',
    margin: '0 0 4px 0',
    color: '#0a0a0a'
  },
  itemQty: {
    fontSize: '12px',
    color: '#666',
    margin: '0'
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#B12704',
    margin: '0'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginBottom: '12px'
  },
  pricingSection: {
    marginBottom: '16px'
  },
  pricingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    marginBottom: '8px',
    color: '#0a0a0a'
  },
  totalRow: {
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(0,0,0,0.08)'
  },
  freeDeliveryBox: {
    display: 'flex',
    gap: '10px',
    backgroundColor: '#eaf6eb',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '16px',
    alignItems: 'flex-start'
  },
  checkmark: {
    color: '#0f9d58',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '2px'
  },
  freeDeliveryTitle: {
    color: '#0f9d58',
    fontSize: '12px',
    fontWeight: '600',
    margin: '0 0 2px 0'
  },
  freeDeliveryText: {
    color: '#0f9d58',
    fontSize: '11px',
    margin: '0'
  }
};

export default CheckoutPage;
