const { getAllUserTransactions, getSingleTransaction } = require("../service/Transaction.service");
const { okResponse, errorResponse } = require("../utils/constants");

const getAllUserTransactionsController = async (req, res) => {
    try {
        const {id} = req.user;
        const {transactions} = await getAllUserTransactions(id);
        
        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Successful request",
            data: transactions
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        })
    }
}

const getSingleTransactionController = async (req, res) => {
    try {
        const {id} = req.params;
        const {message, statusCode, transaction} = await getSingleTransaction(id);
        if(message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode: statusCode,
                message: message
            })
        }
        
        return okResponse({
            res,
            status: "success",
            statusCode: 200,
            message: "Successful request",
            data: transaction
        })
    } catch (error) {
        console.log(error?.message || error);
        return errorResponse({
            res,
            status: "fail",
            message: "Error occurred while processing request",
        })
    }
}

module.exports = {
    getAllUserTransactionsController,
    getSingleTransactionController
}