const express = require('express')
const router = express.Router()
const { userSignup, userLogin, userDashBoard } = require('../controllers/vans.controller')

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.get("/dashboard", userDashBoard)

module.exports = router
