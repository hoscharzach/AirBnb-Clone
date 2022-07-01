#!/usr/bin/env node

require('dotenv').config()

const {port} = require('../config')

const app = require('../app')
const db = require('../db/models')

// Check the database for connection before starting the app
db.sequelize
    .authenticate()
    .then(() => {
        // console.log('Database connection success! Sequelize is ready to use...')

        // Start listening for connections
        app.listen(port
        )
    })
    .catch((err) => {
        // console.log('Database connection failure')
        // console.log(err)
    })
