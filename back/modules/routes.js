const express = require('express')
const router = express.Router()
const register = require('./Users/router')
const comments = require('./Comments/router')
const postsRoute = require('./Posts/router')
const commentsRoute =require('./Comments/router')

router.use('/',postsRoute)
router.use('/',commentsRoute)

module.exports=router