const form = document.querySelector('#posts-form');
const formComment = document.querySelector('#comment-form');
const deletePostForm = document.querySelector('#delete-form');
const deleteCommentForm = document.querySelector('#delete-comm');
const gifButton = document.getElementById("btnSearch");

// Bind event listeners // Comments and Posts Side
formComment.addEventListener('submit', submitComment);
deletePostForm.addEventListener('submit', deletePost);
deleteCommentForm.addEventListener('submit', deleteComm)
form.addEventListener('submit', submitPost);

// Emojis and Giphy
///document.addEventListener("DOMContentLoaded", init);
gifButton.addEventListener("click", CreateGifs );


// Fetch all cats as soon as app is loaded
getAllPosts();