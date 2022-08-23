const { Router } = require("express");
const {
    createPostController,
    getAllPostsController,
    getAllUserPostsController,
    getSinglePostController,
} = require("../controller/post.controller");
const {
    likePostController,
    unLikePostController,
    getPostLikesController
} = require("../controller/like.controller");
const {
    createCommentController,
    getCommentController,
    getAllCommentsController,
} = require("../controller/comment.controller");


const { ROUTES } = require("../utils/constants");
const { decodeToken } = require("../middleware/user.middleware");
const {validatePostInput, validatePostQuery, uploadImage, validateCommentInput} = require("../middleware/post.middleware");

const router = Router();
const { INDEX, ID, COMMENT, USERPOST, LIKE, UNLIKE, POSTCOMMENT } = ROUTES;

router.get(INDEX, decodeToken, getAllPostsController);
router.post(INDEX, decodeToken, uploadImage.single('imgUrl'), validatePostInput, createPostController);
router.get(ID, decodeToken, validatePostQuery, getSinglePostController);
router.post(POSTCOMMENT, decodeToken, validateCommentInput, createCommentController);
router.get(POSTCOMMENT, decodeToken, getCommentController);
router.post(LIKE, decodeToken, likePostController);
router.delete(UNLIKE, decodeToken, unLikePostController);
router.get(LIKE, decodeToken, getPostLikesController);
router.get(USERPOST, decodeToken, validatePostQuery, getAllUserPostsController);



module.exports = router;


