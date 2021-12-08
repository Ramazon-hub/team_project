const express = require('express')
const router = express.Router()
const register = require('./Users/router')
const comments = require('./Comments/router')
const posts = require('./Posts/router')

router.use('/',posts)

module.exports=router