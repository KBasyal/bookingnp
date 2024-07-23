const Joi = require('joi');


const FacilityCreateDTO = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(5).required(),
    adonprice: Joi.number().required()
});

const FacilityUpdateDTO = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(5).required(),
    adonprice: Joi.number().required()

});

module.exports = {
    FacilityCreateDTO,
    FacilityUpdateDTO
};
