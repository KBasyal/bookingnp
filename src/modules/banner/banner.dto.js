const Joi = require("joi")

const BannerCreateDTO = Joi.object({
    title:Joi.string().min(2).required(),
    link:Joi.string().uri().empty(null, "").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    // image: Joi.string()
})
const BannerUpdateDTO = Joi.object({
    title:Joi.string().min(2).required(),
    link:Joi.string().uri().empty(null, "").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image : Joi.string().empty(null, "").optional().default(null)
    // image: Joi.object().empty(null ,  "").optional()
})
module.exports={
    BannerCreateDTO,
    BannerUpdateDTO
}