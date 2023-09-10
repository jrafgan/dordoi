// app.js
const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cards = require('./app/cards');
// const ratings = require('./app/ratings');
const users = require('./app/users');
// const images = require('./app/images');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

// Добавляем роуты из модуля auth
const port = 8003;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/cards', cards);
    // app.use('/ratings', ratings);
    app.use('/users', users);
    // app.use('/images', images);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});
