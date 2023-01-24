const express = require("express");
const router = express.Router();
const teacher = require("../../controller/techer.controller");
const verifyToken = require("../../middleware/verifyToken");


router.patch("/update",verifyToken,teacher.updateATeacherController)
router.get("/get-tuition-req", verifyToken, teacher.getTuitionReqController)



module.exports = router;