const { fetch, fetchAll } = require("../../lib/postgres");
const NEW_POST = `
    insert into posts(
        post_title,
        post_img,
        post_ref_user
    )values($1,$2,$3) returning *;
`;
const DELETE_POST = `
       delete from posts where post_uid=$1 returning * ;
`;
const UPDATE_POST = `
        update posts 
        set post_title =$1,
            post_img =$2
        where post_uid = $3 returning *
`;
const newPost = (postTitle, postImg, postRefUser) =>
  fetch(NEW_POST, postTitle, postImg, postRefUser);
const updatePost = (postTitle, postImg, postId) =>
  fetch(UPDATE_POST, postTitle, postImg, postId);
const deletePost = (postId) => fetch(DELETE_POST,postId);
module.exports = {
  newPost,
  updatePost,
  deletePost
};
