const express = require('express')
const router = express.Router()
const { validate } = require('../../middlewares/jwt')

const userModule = require('./user')

router.get('/users', validate, userModule.GET)
      .get('/auth', validate, userModule.AUTH)
      .post('/signup', userModule.REGISTER)
      .post('/login', userModule.LOGIN)

module.exports = router
