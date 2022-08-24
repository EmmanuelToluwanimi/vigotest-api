const Joi = require("joi");
const { currencies } = require("../utils/constants");


const giftSchema = Joi.object({
    gift_id: Joi.string().required(),
    receiver_id: Joi.string().required(),
    currency: Joi.string().valid(currencies[0], currencies[1], currencies[2]).required(),
    quantity: Joi.string().required(),
})

module.exports = giftSchema;