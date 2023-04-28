// const Product = require('../database/store.model');



// const deleteUser = async (req, res) => {
//     const user = await User.findOne({ where: { id: req.params.id } });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
  
//     if (user.id !== req.user.id && req.user.role.title !== 'admin') {
//       return res.status(403).json({ message: 'Not allowed to delete this user' });
//     }
  
//     await user.update({ deletedAt: new Date() });
  
//     // Soft delete user's products
//     await Product.update({ deletedAt: new Date() }, { where: { userId: user.id } });
  
//     res.json({ message: 'User deleted' });
//   };

//   module.exports = deleteUser;
const UserService = require('./user.service');
const safeControllerWrapper = require('../tools/safeController');



const deleteUser = safeControllerWrapper (async (req, res) => {
  const { id } = req.params;
 
  const message = await UserService.deleteUser(id);
  console.log(message,'message');
  return res.json(message)

});
const updateUser = safeControllerWrapper (async(req, res) => {
  const userId = parseInt(req.params.id);
  const { firstName, lastName } = req.body;
  const user = users.find(user => user.id === userId);
  
  user.firstName = firstName;
  user.lastName = lastName;
  
  res.json({ message: 'User updated successfully', user });
});


const createUser = safeControllerWrapper(async (req, res) => {
  const payload = req.body;
  const message =  await UserService.createUsers(payload);
  console.log(message,'message');
  return res.json(message);
});


  module.exports = {
    deleteUser,
    createUser,
    updateUser
  }