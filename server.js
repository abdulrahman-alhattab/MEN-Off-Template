const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const authCtrl = require('./controllers/auth.js')
const isSignedIn = require('./middleWare/is-signed-in.js')
const { MongoStore } = require('connect-mongo')

const passUserToView = require('./middleware/pass-user-to-view.js')

const applicationsCtrl = require('./controllers/applications')
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(
  session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true
  })
)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
)
app.use(
  '/vip-lounge',
  (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user // Store user info for use in the next function
      next() // Proceed to the next middleware or controller
    } else {
      res.redirect('/') // Redirect unauthenticated users
    }
  }
  // The controller handling the '/vip-lounge' route
)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
// Add our custom middleware right after the session middleware
app.use(passUserToView)

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }))
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'))
// Morgan for logging HTTP requests
app.use(morgan('dev'))

app.use('/auth', authCtrl)

// server.js

// GET /
app.get('/', async (req, res) => {
  res.render('index.ejs')
})
app.use(isSignedIn)
app.use('/users/:usersId/applications/')

app.get('/vip-lounge', async (req, res) => {
  res.send('vipPage')
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})
