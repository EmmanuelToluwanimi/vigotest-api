const Transaction = require("../model/transaction.model");

const storeTransaction = async (data)=>{
    try {
        const transaction = new Transaction(data);
        return await transaction.save();
    } catch (error) {
        throw error;
    }
}

const findByTransactionID = async (id)=>{
    try {
        return await Transaction.getById(id);
    } catch (error) {
        throw error;
    }
}

const findAllUserTransaction = async (id)=>{
    try {
        return await Transaction.getByUserId(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    storeTransaction,
    findByTransactionID,
    findAllUserTransaction
}