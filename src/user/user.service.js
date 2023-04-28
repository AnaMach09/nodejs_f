// const bcrypt = require('bcrypt');
// const User = require('../database/user.model');
// const { StatusCodes } = require('http-status-codes');

// const createUser = async ({
//     nickName,
//     balance,
//     email,
//     password,

// }) => {
//     const user = await User.findOne({
//         where: {
//             email,
//         }
//     });
//     if(user) return new Error('User already exist');
//     const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_AMOUNT);
//     const createUser = await User.create({
//         nickName,
//         balance,
//         email,
//         password: hashedPassword
//     });
//     return !!createUser;
// };

// module.exports = {
//     createUser,
// }
const bcrypt = require("bcrypt");
const User = require("../database/user.model");
const { StatusCodes } = require("http-status-codes");

const deleteUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) throw new ApiError(StatusCodes.USER_NOT_FOUND);

  if (user.id !== req.user.id && req.user.role.title !== "admin")
    throw new ApiError(StatusCodes.Not_allowed_to_delete_this_user);

  await user.update({ deletedAt: new Date() });

  await Product.update(
    { deletedAt: new Date() },
    { where: { userId: user.id } }
  );

  res.json({ message: "User deleted" });
};

const createUser = async ({ nickName, balance, email, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    console.log(user);
    if (user) throw new ApiError(StatusCodes.USER_ALREADY_EXIST);
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_AMOUNT);
    const createUser = await User.create({
      nickName,
      balance,
      email,
      password: hashedPassword,
    });
    console.log(createUser, "createUser");
    return !!createUser;
  } catch (e) {
    console.log("error", e);
  }
};
const updateUser = async ({ userId, firstName, lastName }) => {
  const user = users.find((user) => user.id === userId);

  user.firstName = firstName;
  user.lastName = lastName;

  return user;
};
module.exports = {
  createUser,
  deleteUser,
  updateUser,
};
