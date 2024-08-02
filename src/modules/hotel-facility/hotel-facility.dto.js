const Joi = require('joi');

const HotelFacilityCreateDTO = Joi.object({
    isincluded: Joi.string().pattern(/^(included|not included)$/),
    priceImpact: Joi.number().optional(),
    hotel_id: Joi.string().required(),
    facility_id:Joi.string().required()
});

const HotelFacilityUpdateDTO = Joi.object({
    isincluded: Joi.string().pattern(/^(included|not included)$/),
    priceImpact: Joi.number().optional(),
    hotel_id: Joi.string().required(),
    facility_id:Joi.string().required()
});

module.exports = {
    HotelFacilityCreateDTO,
    HotelFacilityUpdateDTO

};
