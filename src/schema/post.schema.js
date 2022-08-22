const Joi = require("joi");

const createPostSchema = Joi.object({
    imgUrl: Joi.any(),
    description: Joi.string().allow(""),
    allow_giftbag: Joi.boolean().required(),
    allow_comments: Joi.boolean().required(),
    hide_likes: Joi.boolean().required(),
})

module.exports = createPostSchema;