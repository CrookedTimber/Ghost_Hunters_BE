const form = document.querySelector('#posts-form');
const formComment = document.querySelector('#comment-form');
const deleteComment = document.querySelector('#delete-form');


// Bind event listeners
formComment.addEventListener('submit', submitComment);
deleteComment.addEventListener('submit', deletePost);
form.addEventListener('submit', submitPost);


// Fetch all cats as soon as app is loaded
getAllPosts();