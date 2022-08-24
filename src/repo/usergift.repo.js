const User_gift = require("../model/usergift.model");

const storeUserGift = async (data) => {
    try {
        const gift =  new User_gift(data);
        return await gift.save();
    } catch (error) {
        throw error;
    }
}

const findAllUserGifts = async = async (id) => {
    try {
        return await User_gift.getByReceiverId(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    storeUserGift,
    findAllUserGifts
}