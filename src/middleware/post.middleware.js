const createPostSchema = require("../schema/post.schema");
const { errorResponse, formatJoiMessage } = require("../utils/constants");
const multer = require("multer");

const validatePostInput = (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);
  if (error?.message) {
    const message = formatJoiMessage(error.message);
    console.log(error?.message || error);
    return errorResponse({
      res,
      statusCode: 422,
      status: "fail",
      message,
    });
  }

  next();
};

const validatePostQuery = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const message = "Please provide all required fields";
    return errorResponse({
      res,
      statusCode: 422,
      status: "fail",
      message,
    });
  }

  next();
};

const storage = multer.memoryStorage()
const uploadImage = multer({ storage: storage });


module.exports = { validatePostInput, validatePostQuery, uploadImage };
