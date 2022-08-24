const { createGift, getAllGifts, getSingleGift } = require("../service/gift.service");
const { errorResponse, okResponse } = require("../utils/constants");


const createGiftController = async (req, res)=> {
    try {
        await createGift(req.body);
        return okResponse({
            res,
            status: "success",
            statusCode: 201,
            message: "Successful request",
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

const getSingleGiftController = async (req, res)=> {
    try {
        const {id}= req.params;
        const result = await getSingleGift(id);
        if(result?.message){
            return errorResponse({
                res,
                status: 'fail',
                statusCode: result?.statusCode,
                message: result?.message
            })
        }

        return okResponse({
            res,
            status: "success",
            statusCode: 201,
            message: "Successful request",
            data: result.gift
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

const getAllGiftsController = async (req, res)=> {
    try {
        const {gifts} = await getAllGifts();
        return okResponse({
            res,
            status: "success",
            statusCode: 201,
            message: "Successful request",
            data: gifts
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
    createGiftController,
    getAllGiftsController,
    getSingleGiftController
}