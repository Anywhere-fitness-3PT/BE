const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const clientsRouter = require("./clients/clients-router")

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())

server.use(clientsRouter)

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
