const { findGiftById } = require("../repo/gift.repo");
const { storeTransaction } = require("../repo/transaction.repo");
const { findUserById, updateUserWallet } = require("../repo/user.repo");
const { storeUserGift, findAllUserGifts } = require("../repo/usergift.repo");
const { formatNumber } = require("../utils/constants");


const createUserGift = async (data, user) => {
    const {gift_id, receiver_id, quantity} = data;
    try {
        const qty = formatNumber(quantity);
        if (qty <= 0) {
            return {
                statusCode: 400,
                message: "Quantity must be greater than zero"
            }
        }

        const gift = await findGiftById(gift_id);
        if (!gift) {
            return {
                statusCode: 404,
                message: "Gift is not available"
            }
        }

        const total_amount = gift.amount * qty;
        if (user.wallet < total_amount) {
            return {
                statusCode: 400,
                message: "Oops, Insufficient funds. Please fund your account."
            }
        }

        const receiver = await findUserById(receiver_id);
        if (!receiver) {
            return {
                statusCode: 404,
                message: "Oops, user you are trying to gift is not available"
            }
        }

        const newTransaction = {
            ...data,
            status: "successful",
            description: gift.name,
            amount: total_amount,
            quantity: qty
        }

        await shareFunds(user, receiver, total_amount)
        await storeUserGift({...data, quantity: qty, amount: gift.amount});
        await storeTransaction(newTransaction);

    } catch (error) {
        throw error;
    }
};

const getAllUserGifts = async (id) => {
    try {
        const gifts = await findAllUserGifts(id);
        return {gifts};
    } catch (error) {
        throw error;
    }
}

const shareFunds = async (user, receiver, amount) => {
    try {
        const _useramount = user.wallet - amount;
        const _receiveramount = receiver.wallet + amount;

        await updateUserWallet(_useramount, user.id);
        await updateUserWallet(_receiveramount, receiver.id);

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUserGift,
    getAllUserGifts
}