const express= require("express")
const mainRoute = express()


// route import
const authRouter = require('../modules/auth/auth.router')
const userRouter =require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")
const hotelRouter = require("../modules/hotel/hotel.router")
const facilityRouter = require("../modules/facility/facility.router")
const pricemodifierRouter = require("../modules/price-modifier/price-modifier.router")
const roomRouter = require("../modules/room/room.router")
const hotelfacilityRouter = require("../modules/hotel-facility/hotel-facility.router")
const roomfacilityRouter = require ("../modules/room-facility/room-facility.router.js")
const bookingRouter = require("../modules/booking/booking.router.js")




// route mounting
mainRoute.use('/auth', authRouter)// auth.router.js ==> foutes
mainRoute.use('/user',userRouter)
mainRoute.use('/banner', bannerRouter)
mainRoute.use('/hotel',hotelRouter )
mainRoute.use('/facility', facilityRouter)
mainRoute.use('/price-modifier',pricemodifierRouter)
mainRoute.use('/room', roomRouter)
mainRoute.use('/hotel-facility', hotelfacilityRouter)
mainRoute.use('/room-facility', roomfacilityRouter)
mainRoute.use('/booking', bookingRouter)





module.exports = mainRoute;
