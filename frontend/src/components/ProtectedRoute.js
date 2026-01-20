import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../services/api';

function ProtectedRoute({ element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    try {
      await checkAuth();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.container}>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    // Trigger login modal
    window.dispatchEvent(new Event('openAuthModal'));
    return <Navigate to="/" replace />;
  }

  return element;
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#565959'
  }
};

export default ProtectedRoute;
