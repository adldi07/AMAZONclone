import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { checkAuth, logout, getCart } from '../services/api';

function Header({ onSearch }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Check if user is logged in on mount (cookie-based)
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    verifyAuth();
  }, []);

  // Load cart count and listen for updates
  useEffect(() => {
    const loadCart = async () => {
      try {
        const { data } = await getCart();
        const count = data && data.items ? data.items.reduce((s, it) => s + (it.quantity || 0), 0) : 0;
        setCartCount(count);
      } catch (err) {
        // ignore
      }
    };

    const onCartUpdated = (e) => {
      const data = e.detail;
      const count = data && data.items ? data.items.reduce((s, it) => s + (it.quantity || 0), 0) : 0;
      setCartCount(count);
    };

    loadCart();
    window.addEventListener('cartUpdated', onCartUpdated);
    return () => window.removeEventListener('cartUpdated', onCartUpdated);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
    setSearchText('');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setShowAccountMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Sidebar */}
      {showSidebar && (
        <div style={styles.overlay} onClick={() => setShowSidebar(false)}>
          <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.sidebarHeader}>
              <span>👤 Hello, {user ? user.name : 'sign in'}</span>
              <button style={styles.closeButton} onClick={() => setShowSidebar(false)}>✕</button>
            </div>

            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}>Trending</h3>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>Bestsellers</div>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>New Releases</div>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>Movers and Shakers</div>
            </div>

            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}>Shop by Category</h3>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>Electronics →</div>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>Fashion →</div>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>Home & Kitchen →</div>
              <div style={styles.menuItem} onClick={() => { navigate('/'); setShowSidebar(false); }}>Books →</div>
            </div>

            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}>Help & Settings</h3>
              <div style={styles.menuItem}>Your Account</div>
              <div style={styles.menuItem}>Customer Service</div>
              {user ? (
                <div style={styles.menuItem} onClick={handleLogout}>Sign out</div>
              ) : (
                <div style={styles.menuItem} onClick={() => { setShowSidebar(false); setShowAuthModal(true); }}>Sign in</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header style={styles.topHeader}>
        <div style={styles.container}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <span style={styles.logoText}>scaler</span>
            <span style={styles.logoSmile}>commerce</span>
          </div>

          <div style={styles.location}>
            <span style={styles.locationSmall}>Delivering to Dhanbad 826001</span>
            <div style={styles.locationMain}>📍 <strong>Update location</strong></div>
          </div>

          <form style={styles.searchForm} onSubmit={handleSearch}>
            <select style={styles.categoryDropdown}>
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              placeholder="Search Scaler Commerce"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>🔍</button>
          </form>

          <div style={styles.rightSection}>
            <div style={styles.iconBox}>
              <span style={styles.flag}>🇮🇳</span> <strong>EN</strong>
            </div>

            {/* Account with dropdown */}
            <div
              style={styles.iconBox}
              onMouseEnter={() => setShowAccountMenu(true)}
              onMouseLeave={() => setShowAccountMenu(false)}
              onClick={() => !user && setShowAuthModal(true)}
            >
              <span style={styles.small}>Hello, {user ? user.name : 'sign in'}</span>
              <div style={styles.bold}>Account & Lists</div>

              {/* Dropdown Menu */}
              {showAccountMenu && user && (
                <div style={styles.dropdown}>
                  <div style={styles.dropdownItem} onClick={() => navigate('/orders')}>Your Orders</div>
                  <div style={styles.dropdownItem} onClick={handleLogout}>Sign out</div>
                </div>
              )}
            </div>

            <div style={styles.iconBox}>
              <span style={styles.small}>Returns</span>
              <div style={styles.bold}>& Orders</div>
            </div>

            <div style={styles.cart} onClick={() => navigate('/cart')}>
              <span style={styles.cartIcon}>🛒</span>
              <span style={styles.cartBadge}>{cartCount}</span>
              <span style={styles.cartText}>Cart</span>
            </div>
          </div>
        </div>
      </header>

      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <button style={styles.navButton} onClick={() => setShowSidebar(true)}>☰ All</button>
          <span style={styles.navLink}>Today's Deals</span>
          <span style={styles.navLink}>Customer Service</span>
          <span style={styles.navLink}>Registry</span>
          <span style={styles.navLink}>Gift Cards</span>
          <span style={styles.navLink}>Sell</span>
        </div>
      </nav>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '365px',
    backgroundColor: 'white',
    overflowY: 'auto',
    zIndex: 1001,
  },
  sidebarHeader: {
    backgroundColor: '#232F3E',
    color: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
  },
  sidebarSection: {
    borderBottom: '1px solid #ddd',
    padding: '15px 20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#000',
  },
  menuItem: {
    padding: '10px 0',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  topHeader: {
    backgroundColor: '#131921',
    padding: '10px 20px',
    color: 'white',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    maxWidth: '1500px',
    margin: '0 auto',
  },
  logo: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '120px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
  },
  logoSmile: {
    fontSize: '12px',
    color: '#FF9900',
    marginTop: '-5px',
    fontWeight: 'bold',
  },
  location: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    minWidth: '150px',
  },
  locationSmall: {
    fontSize: '12px',
    color: '#ccc',
  },
  locationMain: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  searchForm: {
    display: 'flex',
    flex: 1,
    maxWidth: '800px',
  },
  categoryDropdown: {
    backgroundColor: '#f3f3f3',
    border: 'none',
    padding: '10px',
    borderRadius: '4px 0 0 4px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '60px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
  },
  searchButton: {
    backgroundColor: '#FEBD69',
    border: 'none',
    padding: '0 20px',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontSize: '20px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    fontSize: '14px',
    position: 'relative',
  },
  flag: {
    fontSize: '18px',
  },
  small: {
    fontSize: '12px',
    color: '#ccc',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minWidth: '200px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: '12px 16px',
    color: '#333',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },
  cart: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    position: 'relative',
  },
  cartIcon: {
    fontSize: '32px',
  },
  cartBadge: {
    position: 'absolute',
    top: '-5px',
    left: '15px',
    backgroundColor: '#FF9900',
    color: '#131921',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  cartText: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  navbar: {
    backgroundColor: '#232F3E',
    padding: '10px 20px',
  },
  navContainer: {
    display: 'flex',
    gap: '20px',
    maxWidth: '1500px',
    margin: '0 auto',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid #fff',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
};

export default Header;
