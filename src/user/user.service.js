const bcrypt = require('bcrypt');
const User = require('../database/user.model');
const { StatusCodes } = require('http-status-codes');





const createUser = async ({
    nickName,
    balance,
    email,
    password,

}) => {
    const user = await User.findOne({
        where: {
            email,
        }
    });
    if(user) return new Error('User already exist');
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_AMOUNT);
    const createUser = await User.create({
        nickName,
        balance,
        email,
        password: hashedPassword   
    });
    return !!createUser;
};

module.exports = {
    createUser,
}