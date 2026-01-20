import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWishlist, removeFromWishlist, addToCart } from '../services/api';

function WishlistPage() {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const { data } = await getWishlist();
            setWishlistItems(data);
        } catch (error) {
            console.error('Error loading wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(productId);
            setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId, 1);
            alert('Added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (loading) return (
        <div style={styles.container}>
            <h2>Your Wish List</h2>
            <p>Loading...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Your Wish List</h2>

            {wishlistItems.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>Your wishlist is empty.</p>
                    <button onClick={() => navigate('/')} style={styles.shopButton}>Explore Items</button>
                </div>
            ) : (
                <div style={styles.grid}>
                    {wishlistItems.map((item) => (
                        <div key={item.id} style={styles.card}>
                            <div
                                style={styles.imagePlaceholder}
                                onClick={() => navigate(`/product/${item.productId}`)}
                            >
                                {/* Real app would use item.product.image */}
                                Product Image
                            </div>

                            <div style={styles.details}>
                                <h3
                                    style={styles.productName}
                                    onClick={() => navigate(`/product/${item.productId}`)}
                                >
                                    {item.product.name}
                                </h3>
                                <p style={styles.price}>₹{item.product.price}</p>
                                <div style={styles.stockStatus}>In Stock</div>

                                <button
                                    style={styles.addToCartBtn}
                                    onClick={() => handleAddToCart(item.productId)}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleRemove(item.productId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        minHeight: '80vh',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'normal',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    emptyState: {
        textAlign: 'center',
        marginTop: '50px',
    },
    shopButton: {
        padding: '10px 20px',
        backgroundColor: '#FFD814',
        border: '1px solid #FCD200',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        display: 'flex',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: 'white',
        gap: '20px',
    },
    imagePlaceholder: {
        width: '150px',
        height: '150px',
        backgroundColor: '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        cursor: 'pointer',
    },
    details: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    productName: {
        fontSize: '18px',
        color: '#007185',
        cursor: 'pointer',
        margin: '0 0 5px 0',
    },
    price: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#B12704',
        marginBottom: '10px',
    },
    stockStatus: {
        color: '#007600',
        fontSize: '12px',
        marginBottom: '15px',
    },
    addToCartBtn: {
        backgroundColor: '#FFD814',
        border: '1px solid #FCD200',
        borderRadius: '8px',
        padding: '8px 20px',
        cursor: 'pointer',
        marginBottom: '10px',
        fontSize: '13px',
    },
    deleteBtn: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '11px',
        cursor: 'pointer',
        color: '#565959',
    },
};

export default WishlistPage;
