const form = document.querySelector('#posts-form');
const formComment = document.querySelector('#comment-form');


// Bind event listeners
formComment.addEventListener('submit', submitComment);
form.addEventListener('submit', submitPost);


// Fetch all cats as soon as app is loaded
getAllPosts();