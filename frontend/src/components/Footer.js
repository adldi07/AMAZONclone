import React from 'react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.backToTop} onClick={scrollToTop}>Back to top</div>

      <div style={styles.columnsContainer}>
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Get to Know Us</h4>
          <span style={styles.link}>About Scaler</span>
          <span style={styles.link}>Careers</span>
          <span style={styles.link}>Press Releases</span>
          <span style={styles.link}>Scaler Science</span>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Connect with Us</h4>
          <span style={styles.link}>Facebook</span>
          <span style={styles.link}>Twitter</span>
          <span style={styles.link}>Instagram</span>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Make Money with Us</h4>
          <span style={styles.link}>Sell on Scaler</span>
          <span style={styles.link}>Sell under Scaler Accelerator</span>
          <span style={styles.link}>Advertise Your Products</span>
          <span style={styles.link}>Scaler Pay on Merchants</span>
        </div>

        <div style={styles.column}>
          <h4 style={styles.columnTitle}>Let Us Help You</h4>
          <span style={styles.link}>Your Account</span>
          <span style={styles.link}>Returns Centre</span>
          <span style={styles.link}>Product Safety Alerts</span>
          <span style={styles.link}>Help</span>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div style={styles.brandRow}>
          <div style={styles.brandLogo}>Scaler</div>
          <div style={styles.localeControls}>
            <button style={styles.localeBtn}>English ▾</button>
            <button style={styles.localeBtn}>India 🇮🇳</button>
          </div>
        </div>

        <div style={styles.legal}>
          © 1996-2026, Scaler.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2b3943',
    color: '#e6eef2',
    marginTop: '30px',
    fontSize: '14px'
  },
  backToTop: {
    textAlign: 'center',
    padding: '12px 0',
    backgroundColor: '#37474f',
    cursor: 'pointer',
    fontWeight: '600'
  },
  columnsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '40px auto',
    gap: '40px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: '180px'
  },
  columnTitle: {
    color: 'white',
    fontSize: '16px',
    marginBottom: '8px'
  },
  link: {
    color: '#d7e1e6',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '24px 0',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  brandRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  brandLogo: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'white'
  },
  localeControls: {
    display: 'flex',
    gap: '12px'
  },
  localeBtn: {
    background: 'transparent',
    color: '#d7e1e6',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  legal: {
    textAlign: 'center',
    color: '#bcd0d8',
    fontSize: '12px'
  }
};

export default Footer;