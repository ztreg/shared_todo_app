require('dotenv').config();
const express = require('express');
const todoRoute = require('./routes/todo');
const loginRoute = require('./routes/authentication')
const userRoute = require('./routes/user')

const app = express();
const cors = require('cors')

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

app.use('/todo', todoRoute)
app.use('/users', userRoute)
app.use('/login', cors(), loginRoute)

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})


/*
const hash = require('crypto').randomBytes(64).toString('hex')
app.post('/creteNewUser', (req, res) => {
  // ...
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
  // ...
});
process.env.TOKEN_SECRET;
// username is in the form { username: "my cool username" }
// ^^the above object structure is completely arbitrary
function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
function authenticateToken(req, res, next) {
	console.log('kk')
  // Gather the jwt access token from the request header
	const authHeader = req.headers['authorization']
	console.log('authheader ' + authHeader)
	const token = authHeader && authHeader.split(' ')[1]
	
  if (token == null) return res.sendStatus(401) // if there isn't any token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
	})
	
}

*/