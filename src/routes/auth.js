const { Router } = require("express");
const {
  registerUserController,
  LoginUserController,
} = require("../controller/auth.controller");
const {
  validateLoginInput,
  validateSignUpInput
} = require("../middleware/auth.middleware");
const { ROUTES } = require("../utils/constants");


const router = Router();
const { LOGIN, REGISTER } = ROUTES;

router.post(REGISTER, validateSignUpInput, registerUserController);
router.post(LOGIN, validateLoginInput, LoginUserController);

module.exports = router;
