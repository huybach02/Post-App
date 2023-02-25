const express = require("express");
const router = express.Router();

const Post = require("../models/post");

//Hien thi tat ca posts
router.get("/", async (req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 });
    res.render("posts/index", { posts: posts });
});

//Hien thi form add post
router.get("/add", (req, res) => {
    res.render("posts/add");
});

//Tao post moi
router.post("/", async (req, res) => {
    const { title, text } = req.body;

    let err = [];

    if (!title) {
        err.push({ message: "Title is empty" });
    }
    if (!text) {
        err.push({ message: "Text is empty" });
    }
    if (err.length > 0) {
        res.render("posts/add", { title, text });
    }
    else {
        const newPostData = {
            title: title,
            text: text
        };
        const newPost = new Post(newPostData);
        await newPost.save();
        res.redirect("/posts");
    }
});

//Hien thi form edit post
router.get("/edit/:id", async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean();
    res.render("posts/edit", { post: post });
});

//Cap nhat thay doi post
router.put("/:id", async (req, res) => {
    const { title, text } = req.body;
    await Post.findOneAndUpdate(
        { _id: req.params.id },
        { title: title, text: text }
    );
    res.redirect("/posts");
});

//Xoa post
router.delete("/:id", async (req, res) => {
    await Post.findOneAndRemove({ _id: req.params.id });
    res.redirect("/posts");
});

module.exports = router;