const { Router } = require("express");
const {
  createGiftController,
  getAllGiftsController,
  getSingleGiftController
} = require("../controller/gift.controller");
const { decodeToken } = require("../middleware/user.middleware");
const { ROUTES } = require("../utils/constants");


const router = Router();
const { GIFT, ID } = ROUTES;

router.get(GIFT, decodeToken, getAllGiftsController);
router.get(GIFT + ID, decodeToken, getSingleGiftController);
router.post(GIFT, decodeToken, createGiftController);


module.exports = router;