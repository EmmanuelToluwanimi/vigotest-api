const { findByTransactionID, findAllUserTransaction } = require("../repo/transaction.repo");

const getAllUserTransactions = async (id)=> {
    try {
        const transactions = await findAllUserTransaction(id);
        if(transactions.length === 0) return {
            transactions
        };

        let _some = [];
        _some  = transactions.map((t)=> {
            if (t.sender_id === id) {
                t = {
                    ...t,
                    type: "debit"
                }
            } else {
                t = {
                    ...t,
                    type: "credit"
                }
            }
        })

        return {
            transactions: _some,
        }

    } catch (error) {
        throw error;
    }
}

const getSingleTransaction = async (id, user_id) => {
    try {
        const transaction = await findByTransactionID(id);
        if (!transaction) {
            return {
                statusCode: 404,
                message: "Transaction not found"
            };
        }

        let type = transaction.sender_id === user_id ? "debit" : "credit";
        const modified = {
            ...transaction,
            type
        }

        return {
            transaction: modified,
        }

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUserTransactions,
    getSingleTransaction
}