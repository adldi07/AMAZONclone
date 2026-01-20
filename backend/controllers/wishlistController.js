const { Wishlist, Product } = require('../models');

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.userId ? String(req.userId) : 'default_user';

        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [{
                model: Product,
                as: 'product'
            }]
        });

        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId ? String(req.userId) : 'default_user';

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if already in wishlist
        const exists = await Wishlist.findOne({
            where: { userId, productId }
        });

        if (exists) {
            return res.status(400).json({ error: 'Item already in wishlist' });
        }

        await Wishlist.create({
            userId,
            productId
        });

        // Return updated wishlist
        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [{ model: Product, as: 'product' }]
        });

        res.status(201).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userId ? String(req.userId) : 'default_user';

        const deleted = await Wishlist.destroy({
            where: { userId, productId }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Item not found in wishlist' });
        }

        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [{ model: Product, as: 'product' }]
        });

        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
