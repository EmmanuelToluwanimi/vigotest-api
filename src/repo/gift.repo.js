const Gift = require("../model/gift.model");

const storeGift = async (data) => {
    try {
        const gift = new Gift(data);
        return await gift.save();
    } catch (error) {
        throw error;
    }
}

const findGiftById = async (id) => {
    try {
        const gift = await Gift.getById(id);
        return gift;
    } catch (error) {
        throw error;
    }
}

const findAllGifts = async () => {
    try {
        const gifts = await Gift.getAll();
        return gifts;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    storeGift,
    findAllGifts,
    findGiftById
}