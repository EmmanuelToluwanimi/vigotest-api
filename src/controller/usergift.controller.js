const { createUserGift, getAllUserGifts } = require("../service/usergift.service");

const createUserGiftController = async (req, res) => {
    try {
        const user = req.user;
        const gift = {...req.body, sender_id: user.id};
        const result = await createUserGift(gift, user);
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
            statusCode: 200,
            message: "Bravo, you just gifted a user",
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

const getAllUserGiftsController = async (req, res) => {
    try {
        const {id} = req.user;
        const {gifts} = await getAllUserGifts(id);
        
        return okResponse({
            res,
            status: "success",
            statusCode: 200,
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
    createUserGiftController,
    getAllUserGiftsController,
}
