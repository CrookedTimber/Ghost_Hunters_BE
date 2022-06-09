let fs = require('fs');
let data = fs.readFileSync('./database/postdatabase.json');
const postsData = JSON.parse(data);

class Comment{
    constructor(data){
        this.Id = data.Id;
        this.Title = data.Title;
        this.Date = data.Date;
        this.Text = data.Text;
        this.Emoji = data.Emoji;
        this.Giph = data.Giph;
        this.Author = data.Author;
    }


    static get allPosts(){
        const posts = postsData.map((post) => new Post(post));
        return posts;
    }

    static findPostById(id) {
        try {
            const postData = postsData.filter((post) => post.Id === id)[0];
            const post = new Post(postData);
            return post;
        } catch (err) {
            throw new Error('That post does not exist!');
        }
    }

    static findCommentById(postId, commId) {
        try {
            const postData = postsData.filter((post) => post.Id === postId)[0];
            const commentData = postData.Comments.filter((comment) => comment.Id === commId)[0];
            const comm = new Comment(commentData);
            return comm;
        } catch (err) {
            throw new Error('That comment does not exist!');
        }
    }

    static createPost(post) {
        const newPostId = postsData.length + 1;
        post.Id = newPostId;
        const newPost = new Post({...post});
        postsData.push(newPost);
        return newPost;
    }

    static createComment(post, localPostId) {
        post.Id = postsData[localPostId - 1].Comments.length + 1;
        const newComment = new Comment({...post});
        postsData[localPostId -1].Comments.push(newComment);
        return newComment;
    }

    destroyPost(){
        const post = postsData.filter((post) => post.Id === this.id)[0];
        postsData.splice(postsData.indexOf(post), 1);
    }

    destroyComment(globalPostId, localCommId){
        // Array Starts Index 0
        postsData[globalPostId-1].Comments.splice(localCommId - 1, 1);
        console.log("Destroyed");
    }

}

class Post extends Comment {

    constructor(data){
        super(data);
        this.Type = data.Type;
        this.Comments = data.Comments;
        this.Emoji = data.Emoji;      
    }

}

function createRandomUserName() {
    let userCharacter = [
        "a","b","c","d","e","f",
        "g","h","i","j","k","l",
        "m","n","o","p","q","r",
        "s","t","u","v","w","x",
        "y","z","A","B","C","D",
        "E","F","G","H","I","J",
        "K","L","M","N","O","P",
        "Q","R","S","T","u","V",
        "W","X","Y","Z","1","2",
        "3","4","5","6","7","8",
        "9","0"
    ];

    let userLength = 7
    let username = [];

    for (let r = 0; r < userLength; r++) {
        let randomNumber = Math.floor(Math.random() * userCharacter.length);
        username += userCharacter[randomNumber];
    }
    return username;

}


module.exports = Post;