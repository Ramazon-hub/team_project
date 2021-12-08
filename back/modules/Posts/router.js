const express = require("express");
const router = express.Router();
const {upload} = require('../../lib/multer')

const PostsModule = require('./posts')

router.post("/posts",upload.single('postImg'),PostsModule.POST);
router.put('/posts',upload.single('postImg'),PostsModule.PUT)
router.delete('/posts',PostsModule.DELETE)

module.exports = router;