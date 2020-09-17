const server = require("./server")

const port = process.env.PORT || 5432

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})