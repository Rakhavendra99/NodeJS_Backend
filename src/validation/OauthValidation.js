// validation
import Joi from '@hapi/joi';

const tokenValidation = Joi.object({
    grant_type: Joi.string(),
    client_id: Joi.string(),
    client_secret: Joi.string(),
    scope: Joi.string()
});

const userValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    grant_type: Joi.string().required(),
    client_id: Joi.string().required(),
    client_secret: Joi.string().required(),
    scope: Joi.string().required()
});

const userRegistrationValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.any().required(),
    phone: Joi.number().required(),
    countryId: Joi.number().required(),
    password: Joi.any().required()
});


const loginWithEamilValidation = Joi.object({
    email: Joi.any().required(),
});



const refreshTOkenValidation = Joi.object({
    grant_type: Joi.string().required(),
    client_id: Joi.string().required(),
    client_secret: Joi.string().required(),
    scope: Joi.string().required(),
    refresh_token: Joi.string().required()
});

const forgetPasswordValidation = Joi.object({
    phone: Joi.number().required(),
    countryCode: Joi.any().required()
});

const verifyOtpValidation = Joi.object({
    phone: Joi.number().required(),
    countryCode: Joi.any().required(),
    forgetOtp: Joi.number().required(),
});

const resetPasswordValidation = Joi.object({
    phone: Joi.number().required(),
    countryCode: Joi.any().required(),
    password: Joi.any().required()
});

const changePasswordValidation = Joi.object({
    oldPassword: Joi.any().required(),
    newPassword: Joi.any().required(),
});

module.exports.tokenValidation = tokenValidation;
module.exports.userValidation = userValidation;
module.exports.refreshTOkenValidation = refreshTOkenValidation;
module.exports.userRegistrationValidation = userRegistrationValidation;
module.exports.loginWithEamilValidation = loginWithEamilValidation;
module.exports.forgetPasswordValidation = forgetPasswordValidation;
module.exports.verifyOtpValidation = verifyOtpValidation;
module.exports.resetPasswordValidation = resetPasswordValidation;
module.exports.changePasswordValidation = changePasswordValidation;

