const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors());

const postRoutes = require('../controllers/posts');
const stories = require('../database/storyData');

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello there Ghost hunters!');
});

app.post('/', (req, res) => {
    res.status(405).send('Not allowd!');
});

app.get('/stories/random', (req, res) => {
    function getRandomStory () {
      for (let i = 0; i < stories.length; i++) {
      const randomStory = stories[Math.floor(Math.random() * stories.length)]
      return randomStory
      }
    }
      res.send(getRandomStory())
});

module.exports = app;