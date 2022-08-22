const Joi = require("joi");

const commentSchema = Joi.object({
    post_id: Joi.string().required(),
    user_id: Joi.string().required(),
    comment: Joi.string().required(),
})

module.exports = commentSchema;