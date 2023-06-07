const express = require("express")
const AuthController = require("../controller/auth")
const router = express.Router()

router.post("/auth/create", AuthController.createAuth)
router.post("/auth/login", AuthController.authLogin)
router.get("/auth/verify", AuthController.validateToken)


module.exports = router