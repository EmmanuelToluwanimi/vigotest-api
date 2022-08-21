
const jwt = require('jsonwebtoken');
const { algoType, secretKey } = require( './constants');

function signJwt(
    object,
    options
) {
    return jwt.sign(object, secretKey, {
        ...(options && options),
        algorithm: algoType,
    });
}

function verifyJwt(token) {
    return jwt.verify(token, secretKey);
}

module.exports = {
    signJwt,
    verifyJwt,
}