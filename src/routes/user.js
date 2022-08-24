const { Router } = require("express");
const {
  registerUserController,
} = require("../controller/auth.controller");
const {
  validateGiftInput
} = require("../middleware/gift.middleware");
const { decodeToken } = require("../middleware/user.middleware");
const { ROUTES } = require("../utils/constants");


const router = Router();
const { GIFT, TRANSACTION, ID } = ROUTES;

router.get(GIFT, decodeToken, ()=>{});
router.post(GIFT, decodeToken, validateGiftInput, ()=>{});
router.get(TRANSACTION, decodeToken, ()=>{});
router.get(TRANSACTION + ID, decodeToken, ()=>{});

module.exports = router;