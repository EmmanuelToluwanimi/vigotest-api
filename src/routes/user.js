const { Router } = require("express");
const {
    createUserGiftController,
    getAllUserGiftsController
} = require("../controller/usergift.controller");
const {
    getAllUserTransactionsController,
    getSingleTransactionController
} = require("../controller/transaction.controller");
const {
  validateGiftInput
} = require("../middleware/gift.middleware");
const { decodeToken } = require("../middleware/user.middleware");
const { ROUTES } = require("../utils/constants");


const router = Router();
const { GIFT, TRANSACTION, ID } = ROUTES;

router.get(GIFT, decodeToken, getAllUserGiftsController);
router.post(GIFT, decodeToken, validateGiftInput, createUserGiftController);
router.get(TRANSACTION, decodeToken, getAllUserTransactionsController);
router.get(TRANSACTION + ID, decodeToken, getSingleTransactionController);

module.exports = router;