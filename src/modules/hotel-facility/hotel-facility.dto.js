const Joi = require('joi');

const HotelFacilityCreateDTO = Joi.object({
    isincluded: Joi.boolean().required(),
    priceImpact: Joi.number().optional()
});

const HotelFacilityUpdateDTO = Joi.object({
    isincluded: Joi.boolean().required(),
    priceImpact: Joi.number().optional()
});

module.exports = {
    HotelFacilityCreateDTO,
    HotelFacilityUpdateDTO

};
