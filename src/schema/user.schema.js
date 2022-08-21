const Joi = require("joi");

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    fullname: Joi.string().required(),
    password: Joi.string().required().min(6),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
})

module.exports = {
    signUpSchema,
    loginSchema,
};