const express = require('express');
const router = express.Router()
const adminController = require("../../controller/admin.controller");
const verifiyAdmin = require('../../middleware/verifyAdmin');


router.get("/home", verifiyAdmin, adminController.homeGet)
router.get("/wallate", verifiyAdmin, adminController.adminGetWallateController)
router.post("/purchase-confirmation", verifiyAdmin, adminController.purchaseReqController)


module.exports = router;