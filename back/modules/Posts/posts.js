const model = require("./model");
const { v4: UUID } = require('uuid');
const { rootFile } = require("../../config");

module.exports = {
  POST: async (req, res) => {
    try {
      const { postTitle } = req.body;
      const { mimetype, mv } = req.files.postImage
      if ( mimetype && mv && req.user ) {
          const name = UUID() + '.' + mimetype.split('/')[1]
          await model.newPost(postTitle, name, req.user.user_uid)
          mv(rootFile + '/uploads/' + name, (_) => {})
          res.redirect('http://localhost:3000/')
      } else {
        res.redirect('http://localhost:3000/')
      }
    } catch (err) {
      console.log(err);
    }
  },
  PUT: async (req, res) => {
    try {
      const { postTitle, postImg, postId } = req.body;
      const file = req.file;
      const updatePost = await model.updatePost(postTitle, postImg, postId);
      if (updatePost) {
        res.status(200).json(updatePost);
      } else {
        res.status(400).json({ message: "Not Update" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  DELETE: async (req, res) => {
    try {
      const { postId } = req.body;
      const deletePost = await model.deletePost(postId);
      if (deletePost) {
        res.status(200).json(deletePost);
      } else {
        res.status(200).json({ meassage: "Not delete" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  GET: async (req, res) => {
    try {
      const allPosts = await model.allPosts();
      if (allPosts && req.user) {
        res.status(200).json(allPosts);
      } else {
        res.status(400).json({ message: "No posts" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  SINGLE_POST: async (req, res) => {
      try {
        const { img } = req.params
        res.sendFile(rootFile + '/uploads/' + img)
      } catch (error) {
        console.log(error);
      }
  },
  USER_POST: async (req, res) => {
      try {
        const { userId } = req.params
        const user = await model.userPost(userId)
        res.json(user)
      } catch (error) {
        console.log(error);
      }
  }
};
