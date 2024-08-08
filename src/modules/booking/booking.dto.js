const Joi = require('joi')

const BookingCreateDTO = Joi.object({
    hotel_id :Joi.string().required(),
    room_id:Joi.string().required(),
    // user_id: Joi.string().required(),
    // roomfacility_id:Joi.string().required(),
    checkin:Joi.date().required(),
    checkout: Joi.date().required(),
    noofguests:Joi.string().required(),
    total:Joi.string().required()
})
const BookingEditDTO = Joi.object({
    hotel_id :Joi.string().required(),
    room_id:Joi.string().required(),
    checkin:Joi.date().required(),
    checkout: Joi.date().required(),
    noofguests:Joi.string().required(),
    total:Joi.string().required()
})


module.exports={
    BookingCreateDTO,
    BookingEditDTO
}