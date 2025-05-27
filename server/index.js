const express = require("express")
const http = require("http")
const path = require("path")
const {Server} = require("socket.io") 

const app = express()
const server = http.createServer(app);
const oi = new Server(server);

app.use(express.static('./public'))
app.get("/", (req, res) => {
    return  res.path("./public/index.html")
})

oi.on("connection" , (client) => {
   client.on("user-message"  , (message) => {
    oi.emit("message" ,message)
   })
})

server.listen(3000 , () => {
    console.log(`server running at   http://localhost:3000`)
})


