const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 16);
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;
const algoType = "HS256";
const accessTokenTtl = "1h";
const refreshTokenTtl = "30d";
const saltRounds = 10;
const cookieTtl = 24 * 60 * 60 * 1000;


const dbConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
}

const ROUTES = {
    HEALTHCHECK: "/api/healthcheck",
    AUTH: "/api/auth",
    USER: "/api/user",
    POST: "/api/posts",
    CONVERSATION: "/api/conversations",
    MESSAGE: "/api/messages",
    LOGIN: "/login",
    REGISTER: "/signup",
    LIKE: "/:id/like",
    UNLIKE: "/:id/unlike",
    COMMENT: "/comment",
    GET_FOLLOWERS: "/followers",
    GET_FOLLOWING: "/following",
    USERPOST: "/:id/user",
    ID: "/:id",
    INDEX: "/",
};

const formatJoiMessage = (message) => {
    return message.replace('"', "").replace('"', "");
};

const generateUid = () => {
    return nanoid();
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

/**
 * Handles management of all failed requests
 * @param res http response object
 */
function errorResponse({ res, message, error, status, statusCode = 500 }) {
    res.status(statusCode).json({ status, message, ...(error && { error }) });
}

/**
 * Handles sending responses to the front end.
 * @param res http response object
 */
function okResponse({ res, message, data, status, statusCode = 200 }) {
    res.status(statusCode).json({ status, message, ...(data && { data }) });
}

const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

module.exports = {
    PORT,
    ROUTES,
    secretKey,
    algoType,
    dbConfig,
    accessTokenTtl,
    refreshTokenTtl,
    saltRounds,
    cookieTtl,
    errorResponse,
    okResponse,
    formatJoiMessage,
    generateUid,
    hashPassword,
    comparePassword,
    generateRandomNumber
};
