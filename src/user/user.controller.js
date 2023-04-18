const Product = require('../database/store.model');



const deleteUser = async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    if (user.id !== req.user.id && req.user.role.title !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to delete this user' });
    }
  
    await user.update({ deletedAt: new Date() });
  
    // Soft delete user's products
    await Product.update({ deletedAt: new Date() }, { where: { userId: user.id } });
  
    res.json({ message: 'User deleted' });
  };

  module.exports = deleteUser;