
const form = document.querySelector('#posts-form');
const formComment = document.querySelector('#comment-form');
const deletePostForm = document.querySelector('#delete-form');
const deleteCommentForm = document.querySelector('#delete-comm');


// Bind event listeners
formComment.addEventListener('submit', submitComment);
deletePostForm.addEventListener('submit', deletePost);
deleteCommentForm.addEventListener('submit', deleteComm)
form.addEventListener('submit', submitPost);


// Fetch all cats as soon as app is loaded
getAllPosts();