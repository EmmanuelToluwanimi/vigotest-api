const { Router } = require("express");
const {
    createPostController,
    getAllPostsController,
    getAllUserPostsController,
    getSinglePostController,
} = require("../controller/post.controller");
const { ROUTES } = require("../utils/constants");
const { decodeToken } = require("../middleware/user.middleware");
const {validatePostInput, validatePostQuery} = require("../middleware/post.middleware");

const router = Router();
const { INDEX, ID, USERPOST } = ROUTES;

router.get(INDEX, decodeToken, getAllPostsController);
router.post(INDEX, decodeToken, validatePostInput, createPostController);
router.get(ID, decodeToken, validatePostQuery, getSinglePostController);
router.get(USERPOST, decodeToken, validatePostQuery, getAllUserPostsController);

module.exports = router;


