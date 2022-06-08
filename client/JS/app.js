
const APIKEY = "EuG6ds89Ls0W1mXGMR4fxgxbkHLEW3HI";

function CreateGifs(e){
        e.preventDefault();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
          .then(response => response.json())
          .then(content => {
            console.log(content.data);
            console.log("META", content.meta);
            let fig = document.createElement("figure");
            let img = document.createElement("img");
            let fc = document.createElement("figcaption");
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            fc.textContent = content.data[0].title;
            fig.appendChild(img);
            fig.appendChild(fc);
            let out = document.querySelector(".out");
            out.insertAdjacentElement("afterbegin", fig);
            document.querySelector("#search").value = "";
          })
          .catch(err => {
            console.error(err);
          });
}

//////////////////////////   POSTS AND COMMENTS SECTION  /////////////////////////////////////

function getAllPosts(){
    fetch('http://localhost:5000/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create submit
function submitPost(e){
    e.preventDefault();
    
    const postData = {
        Title: e.target.title.value,
        Date: e.target.date.value,
        Text: e.target.article.value,
        Emoji: e.target.emoji.value,
        Giph: e.target.giph.value,
        Id: -1,
        Comments: [],
        Author: e.target.author.value
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

// Create Comment
function submitComment(e){
    e.preventDefault();
    
    const postData = {
        Title: e.target.title.value,
        Date: e.target.date.value,
        Text: e.target.article.value,
        Emoji: e.target.emoji.value,
        Giph: e.target.giph.value,
        Id: e.target.idn.value,
        Author: e.target.author.value
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


function deletePost(e){
    e.preventDefault();

    console.log("Deleting");

    const ID = e.target.idn.value;

    fetch(`http://localhost:5000/posts/deletepost/${ID}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    window.location.reload();
}

function deleteComm(e){
    e.preventDefault();

    console.log("Deleting");

    const ID = e.target.idnc.value;

    fetch(`http://localhost:5000/posts/deletecomment/${ID}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    window.location.reload();
}

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
    deletePost,
    deleteComm,
    init,
    CreateGifs,
    renderMessage
}