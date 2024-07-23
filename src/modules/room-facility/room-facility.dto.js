const Joi = require('joi');

const RoomFacilityCreateDTO = Joi.object({
    isincluded: Joi.boolean().required(),
    priceImpact: Joi.number().optional(),
    room_id: Joi.string().required(),
    facility_id:Joi.string().required()


});

const RoomFacilityUpdateDTO = Joi.object({
    isincluded: Joi.boolean().required(),
    priceImpact: Joi.number().optional()
});

module.exports = {
    RoomFacilityCreateDTO,
    RoomFacilityUpdateDTO

};
