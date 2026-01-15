const express = require("express")
const router = express.Router();
const {signUp,login ,me} = require('../../controller/User/User.js')
const {authMiddleware} = require("../../middleware/auth.middleware.js")
router.post('/signup', signUp)
router.post('/login', login)
router.get('/me', authMiddleware,me)

module.exports = router