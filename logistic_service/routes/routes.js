const express = require("express")
const router = express.Router()
const LogisticContoller = require("../controller/logistic")
const authenticate = require("../middlewares/authentication")

router.post("/logistic", authenticate, LogisticContoller.createLogistic)
router.get("/logistic", authenticate, LogisticContoller.searchLogistic)



module.exports = router
