const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'General'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 4.5
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;