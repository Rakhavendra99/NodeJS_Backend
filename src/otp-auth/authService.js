import Methods from "./Methods";
import ResponseHandler from '../util/Response'
import { ControllerLog as Log, Common as CommonLog } from '../util/Log';
import Entity from '../entity'
import { fast2sms, generateOTP } from "../util/otp";
// import { createJwtToken } from "../util/token";
import config from "../config";
import { UserRoles } from "../config/Constants";
import { encryptPass, otpMessage } from "../util";

class createNewUserServices {

    async createNewUserServices(data) {
        const methodName = Methods.GET_TOKEN;
        Log.MethodEnter(methodName);
        try {
            let { email } = data
            // check duplicate email
            const emailExist = await Entity.User.findOne({
                where: {
                    email: email,
                }
            })
            if (emailExist) {
                return ResponseHandler.forbidden(methodName, "This Email already exists")
            }
            let findCountryCode = await Entity.Country.findOne({
                where: {
                    id: data.countryId
                }
            })
            if (!findCountryCode) {
                return ResponseHandler.forbidden(methodName, "Country Id not found")
            }
            //encrypt password
            data.password = encryptPass(data.password)
            // create new user
            data.isActive = 1;
            data.createdDate = new Date()
            const createdUser = await Entity.User.create(Object.assign(data));
            return ResponseHandler.success(methodName, createdUser)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async loginWithEamilServices(data) {
        const methodName = Methods.USER_TOKEN;
        Log.MethodEnter(methodName);
        try {
            const { email, password } = data;
            const user = await Entity.User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return ResponseHandler.userNotFound(methodName, {}, "Email Id not found")
            }
            const value = {
                userId: user.id,
                email: user.email,
                phone: user.phone,
            }
            return ResponseHandler.success(methodName, value, "")
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async forgetPasswordServices(data) {
        const methodName = Methods.FORGET_PASSWORD;
        Log.MethodEnter(methodName);
        try {
            let findNumber = await Entity.Users.findOne({
                where: {
                    phone: data.phone,
                    countryCode: data.countryCode
                },
                include: [
                    { model: Entity.Roles },
                    { model: Entity.UserProfile }
                ]
            })
            if (!findNumber) {
                return ResponseHandler.userNotFound(methodName, {}, "Number not found, so please sign up")
            }
            const otp = generateOTP(4);
            findNumber.forgetOtp = otp
            findNumber.isForgerOtp = 0
            await findNumber.save();
            //One Way SMS
            // let message = `Dear ${findNumber.UserProfile.name}, ${otp} is your SECRET OTP to access Aladdin-Admin App. OTP is confidential and valid for 5 minutes. For security reasons, DO NOT share this OTP with anyone.`
            // otpMessage(findNumber.countryCode, findNumber.phone, message);

            const value = {
                userId: findNumber.id,
                countryCode: findNumber.countryCode,
                phone: findNumber.phone,
                forgetOtp: otp,
                roleId: findNumber.roleId,
            }
            return ResponseHandler.success(methodName, value, "OTP Send to your mobile number")
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async verifyForgetOtpServices(data) {
        const methodName = Methods.VERIFY_FORGET_OTP;
        Log.MethodEnter(methodName);
        try {
            let findNumber = await Entity.Users.findOne({
                where: {
                    phone: data.phone,
                    countryCode: data.countryCode
                },
                include: [
                    { model: Entity.Roles },
                    { model: Entity.UserProfile }
                ]
            })
            if (!findNumber) {
                return ResponseHandler.userNotFound(methodName, {}, "Number not found, so please sign up")
            }
            if (findNumber.forgetOtp == data.forgetOtp) {
                findNumber.isForgetOtp = 1
                await findNumber.save();
                const value = {
                    userId: findNumber.id,
                    countryCode: findNumber.countryCode,
                    phone: findNumber.phone,
                    roleId: findNumber.roleId,
                }
                return ResponseHandler.success(methodName, value, "OTP verified successfully")
            } else {
                return ResponseHandler.otpInvalid(methodName, {}, "Invalid OTP")
            }
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async resetPasswordServices(data) {
        const methodName = Methods.RESET_PASSWORD;
        Log.MethodEnter(methodName);
        try {
            let findNumber = await Entity.Users.findOne({
                where: {
                    phone: data.phone,
                    countryCode: data.countryCode
                },
                include: [
                    { model: Entity.Roles },
                    { model: Entity.UserProfile }
                ]
            })
            if (!findNumber) {
                return ResponseHandler.userNotFound(methodName, {}, "Number not found, so please sign up")
            }
            let newPassword = encryptPass(data.password)
            findNumber.update({
                password: newPassword
            })
            return ResponseHandler.success(methodName, {}, "Your New password update Successfully")

        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async changePasswordServices(data, userId) {
        const methodName = Methods.CHANGE_PASSWORD;
        Log.MethodEnter(methodName);
        try {
            let findNumber = await Entity.Users.findOne({
                where: {
                    id: userId
                },
                include: [
                    { model: Entity.Roles },
                    { model: Entity.UserProfile }
                ]
            })
            if (!findNumber) {
                return ResponseHandler.userNotFound(methodName, {}, "Number not found, so please sign up")
            }
            if (findNumber.password == encryptPass(data.oldPassword)) {
                let newPassword = encryptPass(data.newPassword)
                findNumber.update({
                    password: newPassword
                })
            } else {
                return ResponseHandler.userNotFound(methodName, {}, "Your Old Password is incorrect. Please try again...")
            }
            return ResponseHandler.success(methodName, {}, "Your New password update Successfully")

        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }
}
export default new createNewUserServices()