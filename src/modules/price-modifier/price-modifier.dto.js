const Joi = require('joi');


const PriceModifierCreateDTO = Joi.object({
    type: Joi.string().pattern(/^(Seasonal|Discount|Service Charge|Other)$/).required(),
    percentage: Joi.number().required(),
    applicableFrom:Joi.date().required(),
    applicableTo: Joi.date().required()
});

const PriceModifierUpdateDTO = Joi.object({
    type: Joi.string().pattern(/^(Seasonal|Discount|Service Charge|Other)$/).required(),
    percentage: Joi.number().required(),
    applicableFrom:Joi.date().required(),
    applicableTo: Joi.date().required()

});

module.exports = {
    PriceModifierCreateDTO,
    PriceModifierUpdateDTO
};
