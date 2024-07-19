const express= require("express")
const mainRoute = express()


// route import
const authRouter = require('../modules/auth/auth.router')
const userRouter =require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")
const hotelRouter = require("../modules/hotel/hotel.router")




// route mounting
mainRoute.use('/auth', authRouter)// auth.router.js ==> foutes
mainRoute.use('/user',userRouter)
mainRoute.use('/banner', bannerRouter)
mainRoute.use('/hotel',hotelRouter )




module.exports = mainRoute;
