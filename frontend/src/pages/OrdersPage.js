import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/api';

function OrdersPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const { data } = await getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error loading orders:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Your Orders</h1>
            </div>
            <p>Loading...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Your Orders</h1>
            </div>

            <div style={styles.tabs}>
                <span style={styles.activeTab}>Orders</span>
                <span style={styles.tab}>Buy Again</span>
                <span style={styles.tab}>Not Yet Shipped</span>
                <span style={styles.tab}>Cancelled Orders</span>
            </div>

            <div style={styles.ordersList}>
                {orders.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>You haven't placed any orders yet.</p>
                        <button onClick={() => navigate('/')} style={styles.shopButton}>Start Shopping</button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} style={styles.orderCard}>
                            <div style={styles.cardHeader}>
                                <div style={styles.headerGroup}>
                                    <span style={styles.label}>ORDER PLACED</span>
                                    <span style={styles.value}>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div style={styles.headerGroup}>
                                    <span style={styles.label}>TOTAL</span>
                                    <span style={styles.value}>₹{order.totalAmount}</span>
                                </div>
                                <div style={styles.headerGroup}>
                                    <span style={styles.label}>SHIP TO</span>
                                    <span style={styles.link}>{order.shippingName}</span>
                                </div>
                                <div style={{ ...styles.headerGroup, marginLeft: 'auto' }}>
                                    <span style={styles.label}>ORDER # {order.orderId}</span>
                                    <div style={styles.links}>
                                        <span style={styles.link} onClick={() => navigate(`/order-confirmation/${order.orderId}`)}>View order details</span>
                                        <span style={styles.separator}>|</span>
                                        <span style={styles.link}>Invoice</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.cardBody}>
                                <div style={styles.mainContent}>
                                    <h3 style={styles.deliveryStatus}>
                                        Delivery Status: {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Processing'}
                                    </h3>

                                    {order.items && order.items.map((item, idx) => (
                                        <div key={idx} style={styles.itemRow}>
                                            <div style={styles.itemImagePlaceholder}>Image</div> {/* Placeholder since we don't have product images yet */}
                                            <div style={styles.itemDetails}>
                                                <div style={styles.productTitle}>{item.productName}</div>
                                                <div style={styles.productMeta}>Qty: {item.quantity}</div>
                                                <button style={styles.buyAgainButton}>Buy it again</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={styles.actions}>
                                    <button style={styles.actionButton}>Track package</button>
                                    <button style={styles.actionButton}>Leave seller feedback</button>
                                    <button style={styles.actionButton}>Write a product review</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        minHeight: '80vh',
    },
    header: {
        marginBottom: '20px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'normal',
        color: '#000',
    },
    tabs: {
        borderBottom: '1px solid #ddd',
        marginBottom: '20px',
    },
    activeTab: {
        display: 'inline-block',
        padding: '10px 0',
        marginRight: '20px',
        borderBottom: '3px solid #e77600',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#000',
    },
    tab: {
        display: 'inline-block',
        padding: '10px 0',
        marginRight: '20px',
        cursor: 'pointer',
        color: '#007185',
    },
    ordersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    orderCard: {
        border: '1px solid #d5d9d9',
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    cardHeader: {
        backgroundColor: '#f0f2f2',
        padding: '14px 18px',
        display: 'flex',
        gap: '40px',
        borderBottom: '1px solid #d5d9d9',
        fontSize: '12px',
        color: '#565959',
    },
    headerGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        textTransform: 'uppercase',
        marginBottom: '3px',
    },
    value: {
        color: '#333',
    },
    link: {
        color: '#007185',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    links: {
        display: 'flex',
        gap: '5px',
    },
    separator: {
        color: '#333',
    },
    cardBody: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    mainContent: {
        flex: 1,
    },
    deliveryStatus: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#000',
    },
    itemRow: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
    },
    itemImagePlaceholder: {
        width: '90px',
        height: '90px',
        backgroundColor: '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: '12px',
    },
    itemDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: '14px',
        color: '#007185',
        fontWeight: 'bold',
        marginBottom: '5px',
        cursor: 'pointer',
    },
    productMeta: {
        fontSize: '12px',
        color: '#565959',
        marginBottom: '10px',
    },
    buyAgainButton: {
        backgroundColor: '#FFD814',
        border: '1px solid #FCD200',
        borderRadius: '8px',
        padding: '6px 14px',
        fontSize: '12px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(213,217,217,.5)',
    },
    actions: {
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginLeft: '20px',
    },
    actionButton: {
        width: '100%',
        padding: '6px 0',
        backgroundColor: '#fff',
        border: '1px solid #d5d9d9',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '13px',
        boxShadow: '0 2px 5px rgba(213,217,217,.5)',
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px',
    },
    shopButton: {
        marginTop: '10px',
        padding: '8px 20px',
        backgroundColor: '#FFD814',
        border: '1px solid #FCD200',
        borderRadius: '8px',
        cursor: 'pointer',
    }
};

export default OrdersPage;
