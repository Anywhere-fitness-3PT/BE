const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
var cookieParser = require('cookie-parser')
const usersRouter = require("./users/users-router")
const classesRouter = require("./classes/classes-router")
const instructorsRouter = require("./instructors/instructors-router")

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser());

server.use(usersRouter)
server.use(classesRouter)
server.use(instructorsRouter)

server.get("/", (req, res) => {
    res.json({
        message: "Welcome to Anywhere Fitness",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Sorry, something went wrong!"
    })
})

module.exports = server
