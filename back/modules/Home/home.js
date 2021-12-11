const postsModel = require('../Posts/model')
module.exports={
    POSTS:async(req,res)=>{
        try{
            const allPosts = await postsModel.allPosts()
            if(allPosts){
                res.status(200).json(allPosts)
            }else{
                res.status(400).json({message:'no posts ...'})
            }
        }catch(err){
            console.log(err);
        }
    }
}