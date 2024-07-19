const Joi = require('joi');

const hotelTypePattern = /^(Luxury Hotel|Boutique Hotel|Resort Hotel|Business Hotel|Airport Hotel|Extended Stay Hotel|Bed and Breakfast|Motel|Inn|Hostel|Eco Hotel|Apartment Hotel|Casino Hotel|Conference Hotel|Family Hotel|Historic Hotel|Beach Hotel|Ski Hotel)$/;

const HotelCreateDTO = Joi.object({
    name: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
    city: Joi.string().min(2).required(),
    type: Joi.string().pattern(hotelTypePattern).default('Motel'),
    description: Joi.string().min(2).required(),
    image : Joi.string().empty(null, "").optional().default(null)


});

const HotelUpdateDTO = Joi.object({
    name: Joi.string().min(2).optional(),
    country: Joi.string().min(2).optional(),
    city: Joi.string().min(2).optional(),
    type: Joi.string().pattern(hotelTypePattern).default('Motel').optional(),
    description: Joi.string().min(2).optional(),
    image : Joi.string().empty(null, "").optional().default(null)

});

module.exports = {
    HotelCreateDTO,
    HotelUpdateDTO
};
