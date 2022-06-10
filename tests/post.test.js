const Post = require('../models/post');
const posts = require('../models/post');


describe('Testing Post Class', () => {

    test('get all posts', () =>{
         expect(posts.allPosts).toEqual([{"Author": "382Er8G", "Comments": [{"Author": "asdasd", "Date": "Jun 09 2022 14:27:25 GMT+0100", "Id": 1, "Text": "asdasd"}], "Date": "Jun 09 2022 14:26:56 GMT+0100", "Emoji": [4, 2, 2], "Giph": undefined, "Id": 1, "Text": "asdasdlkj  lkjlkjlk   jlkjkj sdnafnasdflk", "Title": "amazing story", "Type": "Ghost"}, {"Author": "pRoZHl4", "Comments": [{"Author": "sdfsdf", "Date": "Jun 09 2022 15:13:20 GMT+0100", "Id": 1, "Text": "sdfsd sdf  sdfdhhfgh fjjergs ety  htrt stg  hjrujrrery "}], "Date": "Jun 09 2022 15:12:52 GMT+0100", "Emoji": [2, 1, 0], "Giph": undefined, "Id": 2, "Text": "gdfg dfgd fgdfg  dfgdfg fdgdfg ", "Title": "the strange case of !!!", "Type": "Ghost"}, {"Author": "zjuh4GZ", "Comments": [{"Author": "fgh", "Date": "Jun 09 2022 15:23:00 GMT+0100", "Id": 1, "Text": "fgh"}], "Date": "Jun 09 2022 15:14:21 GMT+0100", "Emoji": [1, 0, 0], "Giph": undefined, "Id": 3, "Text": "sdfdsfdsf", "Title": "sdf", "Type": "Ghost"}]);
    })


    test('Create new posts', () =>{
        const postData = {
            Title: "e.target.title.value",
            Date: "e.target.date.value",
            Text: "e.target.article.value",
            Emoji: [],
            Giph: "e.target.giph.value",
            Id: 0,
            Author: "e.target.author.value"
        };

        expect(posts.createPost(postData)).toEqual({
               "Author": "e.target.author.value",
               "Comments": undefined,
               "Date": "e.target.date.value",
               "Emoji": [],
               "Giph": "e.target.giph.value",
               "Id": 4,
               "Text": "e.target.article.value",
               "Title": "e.target.title.value",
               "Type": undefined,
        });
    })

   test('Create new Comment', () =>{
        const postData = {
            Title: "e.target.title.value",
            Date: "e.target.date.value",
            Text: "e.target.article.value",
            Id: 2,
            Author: "e.target.author.value"
        };

    expect(posts.createComment(postData, postData.Id)).toEqual({
           "Author": "e.target.author.value",
           "Comments": undefined,
           "Date": "e.target.date.value",
           "Id": 2,
           "Text": "e.target.article.value",
           "Title": "e.target.title.value",
           "Type": undefined,
        });
    })

    test('get posts by id', () =>{
        
        expect(posts.findPostById(4)).toEqual({
            
                   "Emoji": [
                     4,
                     2,
                     2,
                   ],
                   "Giph": undefined,
                   "Id": 1,
                  
                   "Author": "e.target.author.value",
                   "Comments": undefined,
                   "Date": "e.target.date.value",
                   "Emoji": [],
                   "Giph": "e.target.giph.value",
                   "Id": 4,
                   "Text": "e.target.article.value",
                    "Title": "e.target.title.value",
                   "Type": "Ghost",
                   "Type": undefined,
                  
        });
    })


    test('get comment by id', () =>{
        
        expect(posts.findCommentById(3, 1)).toEqual({
            
                   "Emoji": [
                     4,
                     2,
                     2,
                   ],
                   "Giph": undefined,
                   "Id": 1,
                  
                   "Author": "e.target.author.value",
                   "Comments": undefined,
                   "Date": "e.target.date.value",
                   "Emoji": [],
                   "Giph": "e.target.giph.value",
                   "Id": 4,
                   "Text": "e.target.article.value",
                    "Title": "e.target.title.value",
                   "Type": "Ghost",
                   "Type": undefined,
                    "Author": "fgh",
                    "Date": "Jun 09 2022 15:23:00 GMT+0100",
                    "Emoji": undefined,
                    "Giph": undefined,
                    "Id": 1,
                    "Text": "fgh",
                    "Title": undefined,
                  
        });
    })

    test('delete Post', () =>{

        const postData = {
            Title: "e.target.title.value",
            Date: "e.target.date.value",
            Text: "e.target.article.value",
            Emoji: [],
            Giph: "e.target.giph.value",
            Id: 0,
            Author: "e.target.author.value"
        };


        let post = new Post(postData);

        expect(post.destroyPost()).toBe(true);
    })

    test('delete Post', () =>{

        const postData = {
            Title: "e.target.title.value",
            Date: "e.target.date.value",
            Text: "e.target.article.value",
            Emoji: [],
            Giph: "e.target.giph.value",
            Id: 1,
            Author: "e.target.author.value"
        };


        let post = new Post(postData);

        expect(post.destroyComment(3,1)).toBe(true);
    })

});