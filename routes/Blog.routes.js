const express = require("express");
const BlogModel = require("../modals/Blogs");
const blogController = express.Router();

blogController.post("/createBlog", async (req, res) => {
    const { title, body, category } = req.body;
    const new_blog = new BlogModel({
        title,
        body,
        category,
    });
    await new_blog.save();
    res.send({ message: "Blog created", new_blog })
})


blogController.get("/blogs", async (req, res) => {
    const blog = await BlogModel.find()
    return res.json(blog)
})


blogController.get("/:_id", async (req, res) => {
    var id = req.params._id;
    const blog = await BlogModel.find({ "_id": id });
    if(!blog) {
        return res.send("can't find blog")
    }
    let arr = blog[0].body.split(" ");
    
    const words = arr.filter((wrd)=>wrd[0].toLowerCase()=='a');
    return res.send({ "blog": blog , "post body starting with letter a or A": words})
    
})


blogController.patch('/edit/:_id',async(req,res)=>{
    try{
     const blog= await BlogModel.findByIdAndUpdate(req.params._id, req.body);
     await blog.save();
     return res.send(blog);
    }
    catch(err){
     return res.status(500).send({message:err.message});
    }
 })

module.exports = blogController;