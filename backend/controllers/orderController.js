const { Order, OrderItem, Cart, CartItem, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { shipping } = req.body;
    const userId = req.userId ? String(req.userId) : 'default_user';

    // Find active cart for this specific user
    const cart = await Cart.findOne({
      where: { userId, status: 'active' },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });

    // Fallback? If logic requires it, but for now strict strict userId match
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + (parseFloat(item.price) * item.quantity),
      0
    );

    const orderId = 'ORD-' + Date.now();

    const order = await Order.create({
      orderId,
      userId,
      totalAmount,
      shippingName: shipping.name,
      shippingAddress: shipping.address,
      shippingCity: shipping.city,
      shippingPincode: shipping.pincode,
      shippingPhone: shipping.phone
    });

    for (const item of cart.items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price
      });
    }

    cart.status = 'completed';
    await cart.save();

    const fullOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items' }]
    });

    res.status(201).json(fullOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: String(req.userId) },
      include: [{
        model: OrderItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { orderId: req.params.orderId },
      include: [{ model: OrderItem, as: 'items' }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
