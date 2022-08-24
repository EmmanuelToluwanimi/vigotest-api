const { storeGift, findAllGifts, findGiftById } = require("../repo/gift.repo");

const createGift = async (data)=> {
    try {
        return await storeGift(data);
    } catch (error) {
        throw error;
    }
}


const getAllGifts = async ()=> {
    try {
        const gifts = await findAllGifts(data);
        return {
            gifts
        }
    } catch (error) {
        throw error;
    }
}

const getSingleGift = async (id)=> {
    try {
        const gift = await findGiftById(id);
        if (!gift) {
            return {
                statusCode: 404,
                message: "Oops, not available"
            }
        }

        return {
            gift
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createGift,
    getAllGifts,
    getSingleGift
}

