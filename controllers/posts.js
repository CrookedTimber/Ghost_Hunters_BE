const express = require('express');
const router = express.Router();
const fs = require('fs');
const Post = require('../models/post');

router.get('/', (req, res) => {
    const postsData = Post.allPosts;
    res.send(JSON.stringify(postsData, null ,2));
});

router.post('/Comment', (req, res) => {
    const data = req.body;
    //const localPostId = data.Id;
    const newPost = Post.createComment(data, data.Id);
    saveData(data, data.Id, 'Comment');
    res.status(201).send(newPost);
});


router.post('/emojiReaction', (req,res) => {
    const data = req.body;
    console.log(data);
    res.status(201).send(data);
    saveData(data, data.post, 'Reaction');
});

router.post('/Add', (req, res) => {
    const data = req.body;
    const newPost = Post.createPost(data);
    saveData(data, data.Id, 'Post');
    res.status(201).send(newPost);

});

router.delete('/deletepost/:id', (req, res) => {
    const globalPostId =  parseInt(req.params.id);
    console.log("I am Here and ID Number is: " + globalPostId)
    const postToDestroy = Post.findPostById(globalPostId);
    postToDestroy.destroyPost();
    saveData(postToDestroy, globalPostId, "DeletePost")
    res.status(204).send();

});

router.delete('/deletecomment/:id', (req, res) => {
    const post_Comm_Id = req.params.id;

    const globalPostId = parseInt( post_Comm_Id.toString().split("-")[0]);
    const localCommId = parseInt( post_Comm_Id.toString().split("-")[1]);

    console.log("globalPostId: " + globalPostId + " comment ID: " + localCommId);
    const commentToDestroy = Post.findCommentById(globalPostId, localCommId);

    commentToDestroy.destroyComment(globalPostId,localCommId);
    saveData(commentToDestroy, post_Comm_Id, "DeleteComment")
    res.status(204).send();

});


function saveData(data, localPostId, section){
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
        newData[localPostId-1].Comments.push(data);

    }else if(section === 'Post'){
        arr = newData;
        arr.push(data);
    }else if(section === 'DeletePost' ){
        // Targeting Posts Part
        arr = newData[localPostId - 1];
        newData.splice(newData.indexOf(arr), 1); 

    }else if(section === 'DeleteComment' ){
        const globalPostId = parseInt( localPostId.toString().split("-")[0]);
        const localCommId = parseInt( localPostId.toString().split("-")[1]);

        // Targeting Comments Part
        arr = newData[globalPostId - 1].Comments;

        arr.splice(localCommId - 1, 1); 
    }else if(section === 'Reaction'){

        console.log(localPostId);
        // Targeting Emoji Part
        arr = newData[localPostId - 1].Emoji;
        arr[data.emoji] += 1;
    }
    
    
    //save the updated changes
    fs.writeFile('database/postdatabase.json', JSON.stringify(newData, null ,2), finished);

    function finished(err){
        console.log('All Set');
    }

}

module.exports = router;