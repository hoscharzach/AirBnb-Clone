// require the various packages for our app
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { ValidationError } = require('sequelize')
const { environment } = require('./config')
// creates a variable that will resolve to true if the environment is in production
const isProduction = environment === 'production'


// intialize the express app by calling the express method in a variable
const app = express()

// logging information about requests and responses
app.use(morgan('dev'))

// parses cookies
app.use(cookieParser())
// parses json bodies that contain the "application/json" header
app.use(express.json())

// Security middlware here

// only use cors if we are not in production because the frontend will be served on a different server
if (!isProduction) app.use(cors())

// helmet helps set headers to better secure the app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
)

// CRSF token/req.crsfToken method creation
// if not using GET, XSRF-TOKEN cookies value needs to be sent in header of request
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}))


// connect the routes to the main app

const routes = require('./routes')
app.use(routes)


app.use((req, res, next) => {
    const err = new Error("The requested resource could not be found")
    err.title = "Resource Not Found"
    err.errors = ["The requested resource couldn't be found"]
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if(err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message)
        err.title = 'Validation error'
    }
    next(err)
})

module.exports = app
