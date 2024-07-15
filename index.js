const app= require("./src/config/express.config")
const http = require("http")
const server = http.createServer(app)

server.listen(1243, '127.0.0.1', (err)=>{
    if(!err){
        console.log("Your server is running on port 1243")
    }
})