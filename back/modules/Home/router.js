const express=require('express')
const router = express.Router()
const homeModule = require('./home')
router.get('/',homeModule.POSTS)
module.exports=router;