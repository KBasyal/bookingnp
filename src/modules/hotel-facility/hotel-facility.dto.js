const Joi = require('joi');

const HotelFacilityCreateDTO = Joi.object({
    isincluded: Joi.boolean().required(),
    priceImpact: Joi.number().optional(),
    hotel_id: Joi.string().required(),
    facility_id:Joi.string().required()
});

const HotelFacilityUpdateDTO = Joi.object({
    isincluded: Joi.boolean().required(),
    priceImpact: Joi.number().optional()
});

module.exports = {
    HotelFacilityCreateDTO,
    HotelFacilityUpdateDTO

};
