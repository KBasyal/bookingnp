const Joi = require('joi')

const roomTypePattern = /^(Single Room|Double Room|Twin Room|Triple Room|Quad Room|Queen Room|King Room|Studio Room|Suite|Junior Suite|Presidential Suite|Accessible Room|Connecting Rooms|Adjoining Rooms|Deluxe Room|Executive Room|Penthouse)$/

const RoomCreateDTO = Joi.object({
    type: Joi.string().pattern(roomTypePattern).default('Single Room'),
    price_per_night: Joi.number().required(),
    numberofBed: Joi.number().required(),
    isBooked: Joi.string().pattern(/^(open|booked)$/),
    hotel_id:Joi.string().required()

})
const RoomUpdateDTO = Joi.object({
    type: Joi.string().pattern(roomTypePattern).default('Single Room'),
    price_per_night: Joi.number().required(),
    numberofBed: Joi.number().required(),
    isBooked: Joi.string().pattern(/^(open|booked)$/),
    hotel_id:Joi.string().required()


})
module.exports={
    RoomCreateDTO,
    RoomUpdateDTO
}