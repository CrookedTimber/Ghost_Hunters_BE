const express = require('express');
const router = express.Router();
const fs = require('fs');
const Post = require('../models/post');

router.get('/', (req, res) => {
    const postsData = Post.allPosts;
    // 
    // for(const el in postsData){
    //     console.log(postsData[el]);
    // }
    res.send(postsData);
});

router.post('/Comment', (req, res) => {
    const data = req.body;
    const newPost = Post.createComment(data);
    saveData(data, 'Comment');
    res.status(201).send(newPost);
});

router.post('/Add', (req, res) => {
    const data = req.body;
    const newPost = Post.createPost(data);
    saveData(data, 'Post');
    res.status(201).send(newPost);

});

router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    console.log("I am Here and ID Number is: " + postId)
    const postToDestroy = Post.findById(postId);
    postToDestroy.destroy();
    res.status(204).send();

});


function saveData(data, section){
    let newData = null;
    let arr = null;
    try {
        const mainData = fs.readFileSync('database/postdatabase.json');
        newData = JSON.parse(mainData);
    } catch (err) {
        console.error(err);
    }

    if(section === 'Comment'){
        console.log("i am a comment");
        // getting the array of comments from the posts
        // Targeting Comments Part
        arr = newData[data.Id].Comments;
        // and pushing the new data to the targeted array'
        arr.push(data);
        // assign the array in the posts to updated versdion
        newData[data.Id].Comments = arr;
    }else{
        // Targeting Posts Part
        arr = newData;
        arr.push(data);
    }
    
    
    //save the updated changes
    fs.writeFile('database/postdatabase.json', JSON.stringify(newData, null ,2), finished);

    function finished(err){
        console.log('All Set');
    }

}

module.exports = router;