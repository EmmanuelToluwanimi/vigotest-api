const Joi = require("joi");

const commentSchema = Joi.object({
    post_id: Joi.any().required(),
    user_id: Joi.any().required(),
    comment: Joi.string().required(),
})

module.exports = commentSchema;