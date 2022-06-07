let fs = require('fs');
let data = fs.readFileSync('./database/postdatabase.json');
const postsData = JSON.parse(data);

class Comment{
    constructor(data){
        this.Title = data.Title;
        this.Date = data.Date;
        this.Text = data.Text;
        this.Emoji = data.Emoji;
        this.Giph = data.Giph;
        this.Author = data.Author;
    }

}

class Post extends Comment {

    constructor(data){
        super(data);
        this.Id = data.Id;
        this.Comments = data.Comments;
    }

    static get allPosts(){
        const posts = postsData.map((post) => new Post(post));
        return posts;
    }

    static findById(id) {
        try {
            const postData = postsData.filter((post) => post.Id === id)[0];
            const post = new Post(postData);
            return post;
        } catch (err) {
            throw new Error('That post does not exist!');
        }
    }

    static createPost(post) {
        const newPostId = postsData.length + 1;
        post.Id = newPostId;
        const newPost = new Post({...post});
        postsData.push(newPost);
        return newPost;
    }

    static createComment(post) {
        const newComment = new Comment({...post});
        postsData[post.Id].Comments.push(newComment);
        return newComment;
    }

    destroyPost(){
        const post = postsData.filter((post) => post.id === this.id)[0];
        postsData.splice(postsData.indexOf(post), 1);
    }

    destroyComment(id){
        const post = postsData.Comments.filter((post) => post.id === id);

        postsData.splice(postsData.indexOf(post), 1);
    

    }

}


module.exports = Post;