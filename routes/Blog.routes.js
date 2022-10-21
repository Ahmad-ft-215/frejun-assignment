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


blogController.post("/:_id", async (req, res) => {
    var id = req.params._id;
    const blog = await BlogModel.find({ "_id": id });
    if(!blog) {
        return res.send("can't find blog")
    }
    let arr = [];
    
    //console.log(blog[0].title)
    return res.send({ "blog": blog, "body": blog[0].body.split(" ") })
    
})

module.exports = blogController;