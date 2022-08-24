const giftSchema = require("../schema/gift.schema");
const { formatJoiMessage, errorResponse } = require("../utils/constants");

const validateGiftInput = (req, res, next) => {
    const { error } = giftSchema.validate(req.body);
    if (error?.message) {
      const message = formatJoiMessage(error.message);
      console.log(error?.message || error);
      return errorResponse({
        res,
        statusCode: 422,
        status: "fail",
        message,
      });
    }
  
    next();
}

module.exports = {
    validateGiftInput
}