const model = require("./model");

module.exports = {
  POST: async (req, res) => {
    try {
      const { postTitle, postImg, postRefUser } = req.body;
      const file = req.file;
      // const postImg = file.filename

      const newPost = await model.newPost(postTitle, postImg, postRefUser);
      if (newPost) {
        res.status(200).json(newPost);
      } else {
        res.status(400).json({ message: "Invalid valeu" });
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
  GET: async (_, res) => {
    try {
      const allPosts = await model.allPosts();
      if (allPosts) {
        res.status(200).json(allPosts);
      } else {
        res.status(400).json({ message: "No posts" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
