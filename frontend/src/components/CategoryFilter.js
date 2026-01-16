import React from 'react';

function CategoryFilter({ category, setCategory }) {
  const categories = ['all', 'Electronics', 'Books', 'Fashion', 'Home', 'Beauty', 'Toys'];

  return (
    <div style={styles.container}>
      <label style={styles.label}>Category: </label>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            ...styles.button,
            backgroundColor: category === cat ? '#232F3E' : '#f0f0f0',
            color: category === cat ? 'white' : 'black'
          }}
        >
          {cat === 'all' ? 'All' : (cat.charAt(0).toUpperCase() + cat.slice(1))}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    margin: '20px 0',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  button: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default CategoryFilter;
