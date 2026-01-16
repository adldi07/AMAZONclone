import React, { useEffect, useState, useRef } from 'react';
import { fetchProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await fetchProducts();
        if (!mounted) return;
        // use up to 6 products for hero + posters
        const picked = data.slice(0, 8);
        setSlides(picked);
      } catch (err) {
        // fallback: empty
        if (mounted) setSlides([]);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    // autoplay
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % Math.max(1, slides.length));
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [slides]);

  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex(i => (i + 1) % slides.length);

  const heroSlide = slides[index];
  const posters = slides.slice(0, 4);

  return (
    <div style={styles.wrapper}>
      <section style={{ ...styles.hero, backgroundImage: heroSlide ? `url(${heroSlide.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <button style={styles.arrowLeft} onClick={prev}>‹</button>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>Great Republic Day Sale</div>
          <div style={styles.heroText}>More discounts. More delight.</div>
        </div>
        <button style={styles.arrowRight} onClick={next}>›</button>
      </section>

      {/* Cards section */}
      <div style={styles.posterRow}>
        {posters.map((p, i) => (
          <div key={p?.id || i} style={styles.posterCard} onClick={() => navigate(`/?category=${encodeURIComponent(p.category || 'all')}`)}>
            <div style={styles.offerTopBar}></div>
            <div style={styles.offerContent}>
              <h3 style={styles.posterTitle}>Up to 70% off | {p?.category || 'Electronics'}</h3>
              <div style={styles.offerImageBox}>
                {p?.image ? (
                  <img src={p.image} alt={p.category} style={styles.posterImage} />
                ) : (
                  <div style={styles.posterImagePlaceholder} />
                )}
              </div>
            </div>
            <a style={styles.seeAllLink}>See all offers</a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
  },
  hero: {
    width: '100%',
    height: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: 'white',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#1a1a1a'
  },
  posterBackgroundLayer: {
    display: 'none'
  },
  posterBackgroundItem: {
    display: 'none'
  },
  posterBg0: {
    display: 'none'
  },
  posterBg1: {
    display: 'none'
  },
  posterBg2: {
    display: 'none'
  },
  posterBg3: {
    display: 'none'
  },
  posterBackgroundImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  heroInner: {
    textAlign: 'center',
    background: 'rgba(0,0,0,0.4)',
    padding: '24px 40px',
    borderRadius: '12px',
    backdropFilter: 'blur(4px)'
  },
  heroBadge: {
    background: 'rgba(255,255,255,0.15)',
    padding: '10px 20px',
    borderRadius: '20px',
    fontWeight: 700,
    marginBottom: '12px',
    fontSize: '14px',
    letterSpacing: '0.5px'
  },
  heroText: {
    fontSize: '48px',
    fontWeight: 800,
    lineHeight: '1.2',
    letterSpacing: '-1px'
  },
  arrowLeft: {
    position: 'absolute',
    left: '30px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    color: 'white',
    fontSize: '42px',
    cursor: 'pointer',
    padding: '12px 18px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    zIndex: 5
  },
  arrowRight: {
    position: 'absolute',
    right: '30px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    color: 'white',
    fontSize: '42px',
    cursor: 'pointer',
    padding: '12px 18px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    zIndex: 5
  },
  posterRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    maxWidth: '1200px',
    margin: '-120px auto 40px',
    padding: '0 40px',
    position: 'relative',
    zIndex: 10
  },
  posterCard: {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: '1px solid #e5e7eb'
  },
  offerTopBar: {
    height: '8px',
    background: 'linear-gradient(90deg, #ff9900 0%, #ff9900 100%)',
    width: '100%',
  },
  offerContent: {
    padding: '16px',
    flex: 1,
  },
  posterTitle: {
    fontSize: '15px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    color: '#1f2937',
    lineHeight: 1.3
  },
  offerImageBox: {
    width: '100%',
    height: '140px',
    backgroundColor: '#e8f0f8',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    background: '#e8f0f8',
  },
  posterImagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg,#e8f0f8 0%,#d4e4f7 100%)',
  },
  seeAllLink: {
    color: '#0066c0',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '12px 16px',
    textAlign: 'left',
    display: 'block',
    borderTop: '1px solid #e5e7eb',
    transition: 'all 0.2s ease',
  },
  signInBtn: {
    marginTop: 'auto',
    backgroundColor: '#ffd814',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '24px',
    fontWeight: 700,
    cursor: 'pointer'
  }
};

export default HeroBanner;
