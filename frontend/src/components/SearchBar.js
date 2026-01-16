import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search products by name..."
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    margin: '20px 0'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #FF9900',
    borderRadius: '4px'
  }
};

export default SearchBar;
