const Joi = require("joi")

const teamMemberSchema = Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
});

const AboutCreateDTO = Joi.object({
    title:Joi.string().min(2).required(),
    content:Joi.string().required(),
    image: Joi.string(),
    team:Joi.array().items(teamMemberSchema).required(),
})
const AboutUpdateDTO = Joi.object({
    title:Joi.string().min(2).required(),
    content:Joi.string().required(),
    image: Joi.string(),
    team:Joi.array().items(teamMemberSchema).required(),

})
module.exports={
    AboutCreateDTO,
    AboutUpdateDTO
}