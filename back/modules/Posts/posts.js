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
        res.status(200).send(updatePost);
      } else {
        res.status(400).send("Invalid values ...");
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
        res.status(200).send(deletePost);
      } else {
        res.status(200).send("Invalid values ...");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
