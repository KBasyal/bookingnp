const express = require("express")
const app = express()

app.use("/hello",(req, res, next)=>{
    console.log("hello guys")

})

module.exports = app;