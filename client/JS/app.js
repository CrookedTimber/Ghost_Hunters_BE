
function getAllPosts(){
    fetch('http://localhost:5000/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create
function submitPost(e){
    e.preventDefault();
    
    const postData = {
        Title: e.target.title.value,
        Text: e.target.article.value,
        Emoji: e.target.emoji.value,
        Giph: e.target.giph.value,
        Id: -1,
        Comments: [],
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData), 
        headers: {
            "Content-Type": "application/json"
        }

    };

    fetch('http://localhost:5000/posts/Add', options)
        .then(r => r.json())
        .then(appendPost)
        .catch(console.warn)

};

function submitComment(e){
    e.preventDefault();
    
    const postData = {
        Title: e.target.title.value,
        Text: e.target.article.value,
        Emoji: e.target.emoji.value,
        Giph: e.target.giph.value,
        Id: e.target.idn.value,
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData), 
        headers: {
            "Content-Type": "application/json"
        }

    };

    fetch('http://localhost:5000/posts/Comment', options)
        .then(r => r.json())
        .then(appendPost)
        .catch(console.warn)

};


// helpers
function appendPosts(posts){
    posts.forEach(appendPost);
};

function appendPost(postData){
    const newLi = document.createElement('li');
    newLi.textContent = `Title: ${postData.Title} || Post: ${postData.Text} || ${postData.Emoji}  || ${postData.Giph} || ${postData.Comments}`
    const postList = document.querySelector('ul');
    postList.append(newLi);



};

// ********************************************

// MESSAGE FLOW
function getMessage(){
    fetch('http://localhost:5000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
    const msg = document.createElement('p');
    msg.textContent = msgText;
    msg.style.color = 'red';
    document.body.append(msg);
};

// ********************************************

module.exports = {
    getAllPosts,
    submitPost,
    appendPosts,
    appendPost,
    getMessage,
    submitComment,
    renderMessage
}