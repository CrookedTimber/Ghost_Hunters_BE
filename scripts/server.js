const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

const postRoutes = require('../controllers/posts');

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello there Ghost hunters!');
});

app.post('/', (req, res) => {
    res.status(405).send('Not allowd!');
});

module.exports = app;