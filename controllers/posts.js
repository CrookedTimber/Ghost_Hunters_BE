const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/', (req, res) => {
    const postsData = Post.allPosts;
    // 
    for(const el in postsData){
        console.log(postsData[el]);
    }
    res.send(postsData);
});

router.get('/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const selectedPost = Post.findById(postId);
        res.send(selectedPost);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

router.post('/', (req, res) => {
    const data = req.body;
    const id = data.idn;
    console.log(id);
    const newPost = Post.createComment(data, id);
    res.status(201).send(newPost);
});


// router.post('/:id', (req, res) => {
//     const data = req.body;
//     const postId = parseInt(req.params.id);
//     const newPost = Post.createComment(data, postId);
//     res.status(201).send(newPost);
// });

router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToDestroy = Post.findById(postId);
    postToDestroy.destroy();
    res.status(204).send();

});

module.exports = router;