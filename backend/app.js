require('dotenv').config();
const express = require('express');
const todoRoute = require('./routes/todo');
const app = express();
var cors = require('cors')
// const frondEnd = require('./routes/frontend');

const path = require('path')
const port = process.env.PORT || 8081;
/**
 * Middleware
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('./public'))
app.use(cors())

/**
 * Route link
 */
app.use('/', todoRoute);
// app.use('/bloggComment', comRoute);
// app.use('/', frondEnd);




app.listen(port, () => {
    console.log(`Listen on ${port}`);
})
