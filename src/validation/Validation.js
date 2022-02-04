// validation
import Joi from '@hapi/joi';


const deleteValidation = Joi.object({
    id: Joi.number().required()
})


const saveCountryValidation = Joi.object({
    countryCode: Joi.any().required(),
    countryName: Joi.any().required(),
})
const updateCountryValidation = Joi.object({
    id: Joi.number().required(),
    countryCode: Joi.any(),
    countryName: Joi.any(),
})
const saveProductValidation = Joi.object({
    productTypeId: Joi.number().required(),
    productName: Joi.string().required(),
    productObject: Joi.any()
})
module.exports.deleteValidation = deleteValidation;
module.exports.saveCountryValidation = saveCountryValidation;
module.exports.updateCountryValidation = updateCountryValidation;
module.exports.saveProductValidation = saveProductValidation;