const { findUserByEmail, createUser, findUserById, getUsers } = require("../repo/user.repo");
const {generateUid, hashPassword, comparePassword, accessTokenTtl} = require('../utils/constants');
const { signJwt } = require("../utils/jwt.utils")


const signUpUser = async (user) => {
    try {
        // console.log(user);
        const userExists = await findUserByEmail(user.email);
        if (userExists) {
            return {
                statusCode: 400,
                message: "Email already exists"
            }
        }
        user.password = await hashPassword(user.password);
        const newId = await createUser(user);
        const newUser = await findUserById(newId);
        const accessToken = signJwt({id: newUser.id}, {expiresIn: accessTokenTtl});

        return {
            user: {
                id: newUser.id,
                fullname: newUser.fullname,
                email: newUser.email,
            },
            accessToken
        }
    } catch (error) {
        throw error;
    }
}

const loginUser = async (user) => {
    try {
        const userExists = await findUserByEmail(user.email);
        if (!userExists) {
            return {
                statusCode: 404,
                message: "Invalid credentials"
            }
        }

        const isPasswordValid = await comparePassword(user.password, userExists.password);
        if (!isPasswordValid) {
            return {
                statusCode: 401,
                message: "Invalid credentials"
            }
        }

        const accessToken = signJwt({id: userExists.id}, {expiresIn: accessTokenTtl});

        return {
            user: {
                id: userExists.id,
                email: userExists.email,
                fullname: userExists.fullname,
            },
            accessToken
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    loginUser,
    signUpUser,
}
