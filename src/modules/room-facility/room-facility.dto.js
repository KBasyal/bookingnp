const Joi = require('joi');

const RoomFacilityCreateDTO = Joi.object({
    isincluded: Joi.string().pattern(/^(included|not included)$/),
    priceImpact: Joi.number().optional(),
    room_id: Joi.string().required(),
    facility_id:Joi.string().required(),
    hotel_id: Joi.string().required(),

});

const RoomFacilityUpdateDTO = Joi.object({
    isincluded: Joi.string().pattern(/^(included|not included)$/),
    priceImpact: Joi.number().optional(),
    room_id: Joi.string().required(),
    facility_id:Joi.string().required(),
    hotel_id: Joi.string().required(),
});

module.exports = {
    RoomFacilityCreateDTO,
    RoomFacilityUpdateDTO

};
