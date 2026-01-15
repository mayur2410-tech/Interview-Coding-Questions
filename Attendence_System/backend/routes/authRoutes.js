const express = require("express")
const router = express.Router();
const {signUp,login} = require('../controller/User/User.js')

router.post('/signup', signUp)
router.post('/login', login)

module.exports = router