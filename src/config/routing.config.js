const express= require("express")
const mainRoute = express()


// route import
const authRouter = require('../modules/auth/auth.router')
const userRouter =require("../modules/user/user.router")



// route mounting
mainRoute.use('/auth', authRouter)// auth.router.js ==> foutes
mainRoute.use('/user',userRouter)



module.exports = mainRoute;
