// controllers/sellHistory.js
const { User, Product, SellHistory } = require('../models');

exports.buyProduct = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { productId } = req.body;

    const product = await Product.findOne({
      where: { id: productId, deletedAt: null },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const sellerId = product.userId;

    if (buyerId === sellerId) {
      return res.status(400).json({ message: 'You cannot buy your own product' });
    }

    const buyer = await User.findByPk(buyerId);
    const seller = await User.findByPk(sellerId);

    if (!buyer || !seller) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (buyer.balance < product.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    await User.increment({ balance: -product.price }, { where: { id: buyerId } });
    await User.increment({ balance: product.price }, { where: { id: sellerId } });

    const sellHistory = await SellHistory.create({
      price: product.price,
      productId: product.id,
      sellerId,
      buyerId,
    });

    await Product.update({ soldAt: new Date() }, { where: { id: productId } });

    res.status(200).json(sellHistory);
  } catch (error) {
    // Handle error
  }
};
