const User = require("../model/user.model")

const createUser = async (user) => {
    try {
        const {fullname, email, password} = user;
        const newUser =  new User(
            fullname,
            email,
            password
        );
        return await newUser.save();
    } catch (error) {
        throw error
    }
}

const getUsers = async () => {
    try {
        const users = await User.getAll();
        return users;
    } catch (error) {
        throw error
    }
}

const findUserById = async (id) => {
    try {
        const user = await User.getById(id);
        return user;
    } catch (error) {
        throw error
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.getByEmail(email);
        return user;
    } catch (error) {
        throw error
    }
}

const updateUserWallet = async (amount, id) => {
    try {
        await User.updateWallet(amount, id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUsers,
    findUserById,
    findUserByEmail,
    updateUserWallet
}