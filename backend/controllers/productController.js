const { Product } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let where = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }
    
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
      raw: true
    });
    res.json(categories.map(c => c.category || 'General'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
