const { Cart, CartItem, Product } = require('../models');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { userId: 'default_user', status: 'active' },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });
    
    if (!cart) {
      cart = await Cart.create({ userId: 'default_user' });
      cart.items = [];
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    let cart = await Cart.findOne({
      where: { userId: 'default_user', status: 'active' }
    });
    
    if (!cart) {
      cart = await Cart.create({ userId: 'default_user' });
    }
    
    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });
    
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        price: product.price
      });
    }
    
    const updatedCart = await Cart.findByPk(cart.id, {
      include: [{
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });
    
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.itemId);
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();
    
    const cart = await Cart.findByPk(cartItem.cartId, {
      include: [{
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId);
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    const cartId = cartItem.cartId;
    await cartItem.destroy();
    
    const cart = await Cart.findByPk(cartId, {
      include: [{
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
