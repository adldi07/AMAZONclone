import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/api';

function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data } = await getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.container}><p>Loading order...</p></div>;
  if (!order) return <div style={styles.container}><p>Order not found</p></div>;

  const orderDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={styles.container}>
      <div style={styles.successSection}>
        <div style={styles.successIcon}>✓</div>
        <h1 style={styles.successTitle}>Your order has been confirmed</h1>
        <p style={styles.successText}>
          Thank you for your order. You can find order status and tracking information in your account.
        </p>
      </div>

      <div style={styles.contentRow}>
        {/* Left Column - Order Details */}
        <div style={styles.leftColumn}>
          {/* Order Number Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Order Number</h2>
            <p style={styles.orderNumber}>{order.orderId}</p>
            <p style={styles.orderDate}>Ordered on {orderDate}</p>
          </div>

          {/* Items Ordered Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Items Ordered</h2>
            <div style={styles.itemsList}>
              {order.items && order.items.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <div style={styles.itemInfo}>
                    <p style={styles.itemName}>{item.productName}</p>
                    <p style={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Order Summary</h2>
            <div style={styles.summaryDetails}>
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping Charge:</span>
                <span style={{color: '#0f9d58'}}>FREE</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Tax:</span>
                <span>₹0.00</span>
              </div>
              <div style={{...styles.summaryRow, ...styles.totalRow}}>
                <span>Order Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Delivery Address</h2>
            <p style={styles.addressName}>{order.shippingName}</p>
            <p style={styles.addressText}>{order.shippingAddress}</p>
            <p style={styles.addressText}>{order.shippingCity}, {order.shippingPincode}</p>
            <p style={styles.addressText}>Phone: {order.shippingPhone}</p>
          </div>
        </div>

        {/* Right Column - Delivery Info */}
        <div style={styles.rightColumn}>
          <div style={styles.deliveryBox}>
            <h3 style={styles.deliveryTitle}>Estimated Delivery</h3>
            <p style={styles.deliveryDate}>{estimatedDelivery}</p>
            
            <div style={styles.trackingSection}>
              <div style={styles.trackingStep}>
                <div style={{...styles.trackingCircle, backgroundColor: '#0f9d58'}}>✓</div>
                <div style={styles.trackingText}>
                  <p style={styles.trackingLabel}>Order Confirmed</p>
                  <p style={styles.trackingTime}>Today</p>
                </div>
              </div>
              
              <div style={styles.trackingLine} />
              
              <div style={styles.trackingStep}>
                <div style={styles.trackingCircle}>2</div>
                <div style={styles.trackingText}>
                  <p style={styles.trackingLabel}>Processing</p>
                  <p style={styles.trackingTime}>Tomorrow</p>
                </div>
              </div>
              
              <div style={styles.trackingLine} />
              
              <div style={styles.trackingStep}>
                <div style={styles.trackingCircle}>3</div>
                <div style={styles.trackingText}>
                  <p style={styles.trackingLabel}>Shipped</p>
                  <p style={styles.trackingTime}>Jan 18</p>
                </div>
              </div>
              
              <div style={styles.trackingLine} />
              
              <div style={styles.trackingStep}>
                <div style={styles.trackingCircle}>4</div>
                <div style={styles.trackingText}>
                  <p style={styles.trackingLabel}>Out for Delivery</p>
                  <p style={styles.trackingTime}>Jan 19</p>
                </div>
              </div>
              
              <div style={styles.trackingLine} />
              
              <div style={styles.trackingStep}>
                <div style={styles.trackingCircle}>5</div>
                <div style={styles.trackingText}>
                  <p style={styles.trackingLabel}>Delivered</p>
                  <p style={styles.trackingTime}>{estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            style={styles.continueButton}
          >
            Continue Shopping
          </button>
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
    backgroundColor: '#f3f4f6',
    minHeight: '100vh'
  },
  successSection: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '4px',
    marginBottom: '30px',
    border: '1px solid rgba(0,0,0,0.08)'
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#0f9d58',
    color: 'white',
    fontSize: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#0a0a0a',
    margin: '0 0 12px 0'
  },
  successText: {
    fontSize: '14px',
    color: '#565959',
    margin: '0'
  },
  contentRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  leftColumn: {
    flex: 1
  },
  rightColumn: {
    width: '360px'
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    marginBottom: '16px',
    border: '1px solid rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0a0a0a',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  orderNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0a0a0a',
    margin: '0 0 4px 0'
  },
  orderDate: {
    fontSize: '13px',
    color: '#565959',
    margin: '0'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '12px',
    marginBottom: '12px',
    borderBottom: '1px solid rgba(0,0,0,0.08)'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#0a0a0a',
    margin: '0 0 4px 0'
  },
  itemQty: {
    fontSize: '12px',
    color: '#565959',
    margin: '0'
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#B12704',
    margin: '0'
  },
  summaryDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    marginBottom: '8px',
    color: '#565959'
  },
  totalRow: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(0,0,0,0.08)'
  },
  addressName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0a0a0a',
    margin: '0 0 8px 0'
  },
  addressText: {
    fontSize: '13px',
    color: '#565959',
    margin: '0 0 4px 0',
    lineHeight: '1.5'
  },
  deliveryBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.08)',
    marginBottom: '16px'
  },
  deliveryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0a0a0a',
    margin: '0 0 4px 0'
  },
  deliveryDate: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f9d58',
    margin: '0 0 24px 0'
  },
  trackingSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  trackingStep: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px'
  },
  trackingCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#ccc',
    flexShrink: 0
  },
  trackingLine: {
    width: '2px',
    height: '20px',
    backgroundColor: '#ccc',
    marginLeft: '15px',
    marginBottom: '-4px'
  },
  trackingText: {
    flex: 1
  },
  trackingLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#0a0a0a',
    margin: '0 0 2px 0'
  },
  trackingTime: {
    fontSize: '12px',
    color: '#565959',
    margin: '0'
  },
  continueButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#FFD814',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    color: '#000'
  }
};

export default OrderConfirmationPage;
