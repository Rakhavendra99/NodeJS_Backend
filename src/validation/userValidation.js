// validation
import Joi from '@hapi/joi';

const registerValidation = Joi.object({
       
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });

const loginValidation =  Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });

const passwordValidation = data => {
    const schema = Joi.object({
        oldPassword: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const emailValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email()
    });
    return schema.validate(data);
}
const resetAndChangePassword = data => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        OTP: Joi.string().regex(/^[0-9]{6}/),
        userid: Joi.string().required()
    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.emailValidation = emailValidation;
module.exports.resetAndChangePassword = resetAndChangePassword;