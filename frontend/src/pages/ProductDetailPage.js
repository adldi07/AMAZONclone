import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, addToCart, addToWishlist } from '../services/api';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data);
        setSelectedImageIndex(0);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(id, 1);
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

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(id);
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        backgroundColor: #007185;
        color: white;
        padding: 16px 24px;
        borderRadius: 4px;
        zIndex: 1000;
        boxShadow: 0 2px 8px rgba(0,0,0,0.2);
      `;
      toast.textContent = 'Added to Wish List!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      const msg = error.response?.data?.error || 'Could not add to wishlist';
      alert(msg);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(id, 1);
      navigate('/cart');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (!product) return <div style={styles.container}>Product not found</div>;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = images[selectedImageIndex];
  const mrp = parseFloat(product.price) * 1.2;
  const discount = 8;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.mainLayout}>
          {/* Left Sidebar - Thumbnails */}
          <div style={styles.leftSidebar}>
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                style={{
                  ...styles.thumbnail,
                  borderColor: selectedImageIndex === index ? '#FF9900' : '#ddd'
                }}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} style={styles.thumbnailImage} />
              </div>
            ))}
          </div>

          {/* Middle Section - Product Details */}
          <div style={styles.middleSection}>
            {/* Main Image */}
            <div style={styles.mainImageContainer}>
              <img
                src={currentImage}
                alt={product.name}
                style={styles.mainImage}
              />
            </div>

            {/* Breadcrumb */}
            <p style={styles.breadcrumb}>Electronics › Mobiles & Accessories › Smartphones</p>

            {/* Title and Rating */}
            <h1 style={styles.title}>{product.name}</h1>

            <div style={styles.ratingRow}>
              <span style={styles.ratingStars}>⭐⭐⭐⭐☆ 4.5</span>
              <span style={styles.reviewCount}>(10,096)</span>
            </div>

            {/* Badges */}
            <div style={styles.badgesRow}>
              <span style={styles.badge}>Amazon's Choice</span>
            </div>

            {/* Bought Info */}
            <p style={styles.boughtInfo}>1K+ bought in past month</p>

            {/* Deal Badge and Price */}
            <div style={styles.dealSection}>
              <span style={styles.dealBadge}>Republic Day Deal</span>
            </div>

            <div style={styles.priceRow}>
              <span style={styles.discount}>-{discount}%</span>
              <span style={styles.currentPrice}>₹{product.price?.toLocaleString()}</span>
            </div>

            <div style={styles.mrpRow}>
              <span style={styles.mrpLabel}>M.R.P: </span>
              <span style={styles.mrpValue}>₹{mrp.toLocaleString()}</span>
            </div>

            <p style={styles.taxInfo}>Inclusive of all taxes</p>

            {/* EMI Option */}
            <p style={styles.emiInfo}>EMI starts at ₹2,250. No Cost EMI available</p>

            {/* Offers Section */}
            <div style={styles.offersSection}>
              <h3 style={styles.offersTitle}>Offers</h3>
              <div style={styles.offersGrid}>
                <div style={styles.offerCard}>
                  <p style={styles.offerTitle}>Bank Offer</p>
                  <p style={styles.offerText}>Upto ₹1,000.00 discount on SBI Credit Cards</p>
                  <p style={styles.offerLink}>2 offers ›</p>
                </div>
                <div style={styles.offerCard}>
                  <p style={styles.offerTitle}>No Cost EMI</p>
                  <p style={styles.offerText}>Upto ₹1,668.44 EMI interest savings on Amazon Pay ICICI...</p>
                  <p style={styles.offerLink}>1 offer ›</p>
                </div>
                <div style={styles.offerCard}>
                  <p style={styles.offerTitle}>Cashback</p>
                  <p style={styles.offerText}>Upto ₹1,919.00 cashback as Amazon Pay Balance</p>
                  <p style={styles.offerLink}>1 offer ›</p>
                </div>
              </div>
            </div>

            {/* Delivery Benefits */}
            <div style={styles.benefitsRow}>
              <div style={styles.benefit}>
                <div style={styles.benefitIcon}>📱</div>
                <p>10 days Service Centre Replacement</p>
              </div>
              <div style={styles.benefit}>
                <div style={styles.benefitIcon}>🚚</div>
                <p>Free Delivery</p>
              </div>
              <div style={styles.benefit}>
                <div style={styles.benefitIcon}>🛡️</div>
                <p>Warranty Policy</p>
              </div>
              <div style={styles.benefit}>
                <div style={styles.benefitIcon}>💳</div>
                <p>Pay on Delivery</p>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div style={styles.specTable}>
                <h3 style={styles.specTitle}>Specifications</h3>
                {Object.entries(product.specifications).slice(0, 6).map(([key, value]) => (
                  <div key={key} style={styles.specRow}>
                    <span style={styles.specLabel}>
                      {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}
                    </span>
                    <span style={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* About Section */}
            <div style={styles.aboutSection}>
              <h3 style={styles.aboutTitle}>About this item</h3>
              <p style={styles.aboutText}>{product.description}</p>
            </div>
          </div>

          {/* Right Sidebar - Purchase */}
          <div style={styles.rightSidebar}>
            <div style={styles.purchaseBox}>
              {/* Exchange Offer */}
              <div style={styles.exchangeBox}>
                <p style={styles.exchangeLabel}>With Exchange</p>
                <p style={styles.exchangeValue}>Up to ₹60,000.00 off</p>
              </div>

              {/* Price and Delivery */}
              <div style={styles.priceBox}>
                <p style={styles.buyNewLabel}>Buy new:</p>
                <p style={styles.buyNewPrice}>₹{product.price?.toLocaleString()}</p>
              </div>

              {/* Delivery Info */}
              <div style={styles.deliveryBox}>
                <p style={styles.deliveryFreeText}>
                  <span style={styles.checkmark}>✓</span>
                  <strong>FREE delivery</strong> Monday, 19 January
                </p>
                <p style={styles.deliveryFastText}>
                  Or <strong>fastest delivery</strong> Sunday, 18 January. <span style={styles.orderWithin}>Order within 1 hr 25 mins</span>
                </p>
              </div>

              {/* Location */}
              <p style={styles.location}>📍 Delivering to Dhanbad 826001 - Update location</p>

              {/* Stock Status */}
              <p style={styles.inStock}>In stock</p>

              {/* Seller Info */}
              <p style={styles.sellerInfo}>
                Ships from <strong>Amazon</strong><br />
                Sold by <strong>Clicktech Retail Private Ltd</strong>
              </p>

              {/* Payment */}
              <p style={styles.payment}>🔒 Secure transaction</p>

              {/* Add to Cart and Buy Now */}
              <button onClick={handleAddToCart} style={styles.addToCartBtn}>
                Add to cart
              </button>
              <button onClick={handleBuyNow} style={styles.buyNowBtn}>
                Buy Now
              </button>

              {/* Add to Wishlist */}
              <button onClick={handleAddToWishlist} style={styles.wishlistBtn}>
                Add to Wish List
              </button>

              {/* Gift Options */}
              <label style={styles.giftCheckbox}>
                <input type="checkbox" />
                <span>Add gift options</span>
              </label>

              {/* Protection Plans */}
              <div style={styles.protectionSection}>
                <p style={styles.protectionTitle}>Add a Protection Plan:</p>
                <label style={styles.protectionOption}>
                  <input type="checkbox" />
                  <div>
                    <p style={styles.protectionName}>1 Year Protect+ with AppleCare Service</p>
                    <p style={styles.protectionPrice}>₹6,799.00</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#fff',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'Arial, sans-serif'
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr 350px',
    gap: '20px',
    backgroundColor: '#fff'
  },

  /* Left Sidebar */
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    overflow: 'hidden',
    padding: '4px',
    backgroundColor: '#f5f5f5'
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  /* Middle Section */
  middleSection: {
    paddingRight: '20px'
  },
  mainImageContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    padding: '20px',
    minHeight: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  mainImage: {
    maxWidth: '100%',
    maxHeight: '450px',
    objectFit: 'contain'
  },
  breadcrumb: {
    fontSize: '12px',
    color: '#666',
    margin: '8px 0',
    textDecoration: 'none'
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#0F1111',
    margin: '8px 0',
    lineHeight: '1.3'
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '8px 0'
  },
  ratingStars: {
    fontSize: '14px',
    color: '#0F1111',
    fontWeight: '500'
  },
  reviewCount: {
    fontSize: '14px',
    color: '#0066C0',
    cursor: 'pointer'
  },
  badgesRow: {
    display: 'flex',
    gap: '8px',
    margin: '8px 0'
  },
  badge: {
    backgroundColor: '#232F3E',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  boughtInfo: {
    fontSize: '13px',
    color: '#666',
    margin: '8px 0'
  },
  dealSection: {
    margin: '12px 0'
  },
  dealBadge: {
    backgroundColor: '#C41E3A',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    margin: '16px 0'
  },
  discount: {
    fontSize: '18px',
    color: '#C41E3A',
    fontWeight: 'bold'
  },
  currentPrice: {
    fontSize: '32px',
    color: '#0F1111',
    fontWeight: '500'
  },
  mrpRow: {
    fontSize: '13px',
    color: '#666',
    margin: '4px 0'
  },
  mrpLabel: {
    marginRight: '4px'
  },
  mrpValue: {
    textDecoration: 'line-through'
  },
  taxInfo: {
    fontSize: '13px',
    color: '#666',
    margin: '4px 0'
  },
  emiInfo: {
    fontSize: '13px',
    color: '#0066C0',
    margin: '8px 0'
  },
  offersSection: {
    margin: '20px 0',
    borderTop: '1px solid #e7e7e7',
    paddingTop: '16px'
  },
  offersTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0F1111',
    margin: '0 0 12px 0'
  },
  offersGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px'
  },
  offerCard: {
    border: '1px solid #e7e7e7',
    borderRadius: '4px',
    padding: '12px',
    backgroundColor: '#fff'
  },
  offerTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#0F1111',
    margin: '0 0 4px 0'
  },
  offerText: {
    fontSize: '12px',
    color: '#666',
    margin: '0 0 8px 0'
  },
  offerLink: {
    fontSize: '12px',
    color: '#0066C0',
    cursor: 'pointer',
    margin: '0'
  },
  benefitsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '12px',
    margin: '20px 0',
    textAlign: 'center'
  },
  benefit: {
    fontSize: '12px',
    color: '#666',
    padding: '12px'
  },
  benefitIcon: {
    fontSize: '24px',
    marginBottom: '4px'
  },
  specTable: {
    margin: '20px 0',
    borderTop: '1px solid #e7e7e7',
    paddingTop: '16px'
  },
  specTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0F1111',
    margin: '0 0 12px 0'
  },
  specRow: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '16px',
    padding: '8px 0',
    borderBottom: '1px solid #e7e7e7'
  },
  specLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#0F1111'
  },
  specValue: {
    fontSize: '13px',
    color: '#666'
  },
  aboutSection: {
    margin: '20px 0',
    borderTop: '1px solid #e7e7e7',
    paddingTop: '16px'
  },
  aboutTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0F1111',
    margin: '0 0 12px 0'
  },
  aboutText: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6'
  },

  /* Right Sidebar */
  rightSidebar: {
    position: 'sticky',
    top: '20px',
    height: 'fit-content'
  },
  purchaseBox: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    backgroundColor: '#fff'
  },
  exchangeBox: {
    padding: '12px',
    backgroundColor: '#F5E6D3',
    borderRadius: '4px',
    marginBottom: '12px'
  },
  exchangeLabel: {
    fontSize: '12px',
    color: '#666',
    margin: '0 0 4px 0'
  },
  exchangeValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#C41E3A',
    margin: '0'
  },
  priceBox: {
    marginBottom: '12px'
  },
  buyNewLabel: {
    fontSize: '12px',
    color: '#666',
    margin: '0 0 4px 0'
  },
  buyNewPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0F1111',
    margin: '0'
  },
  deliveryBox: {
    padding: '12px 0',
    borderTop: '1px solid #e7e7e7',
    borderBottom: '1px solid #e7e7e7',
    marginBottom: '12px'
  },
  deliveryFreeText: {
    fontSize: '13px',
    color: '#0F1111',
    margin: '0 0 6px 0'
  },
  checkmark: {
    color: '#28a745',
    fontWeight: 'bold',
    marginRight: '4px'
  },
  deliveryFastText: {
    fontSize: '13px',
    color: '#666',
    margin: '0'
  },
  orderWithin: {
    color: '#C41E3A'
  },
  location: {
    fontSize: '12px',
    color: '#0066C0',
    margin: '12px 0',
    cursor: 'pointer'
  },
  inStock: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#28a745',
    margin: '12px 0'
  },
  sellerInfo: {
    fontSize: '12px',
    color: '#666',
    margin: '12px 0'
  },
  payment: {
    fontSize: '12px',
    color: '#666',
    margin: '12px 0'
  },
  addToCartBtn: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#FFC107',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#0F1111',
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'background-color 0.2s'
  },
  buyNowBtn: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#FF9900',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '12px',
    transition: 'background-color 0.2s'
  },
  wishlistBtn: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0F1111',
    cursor: 'pointer',
    marginBottom: '12px'
  },
  giftCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#0F1111',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  protectionSection: {
    paddingTop: '16px',
    borderTop: '1px solid #e7e7e7'
  },
  protectionTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#0F1111',
    margin: '0 0 12px 0'
  },
  protectionOption: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  protectionName: {
    margin: '0 0 2px 0',
    color: '#0F1111',
    fontWeight: '500'
  },
  protectionPrice: {
    margin: '0',
    color: '#666'
  }
};

export default ProductDetailPage;
