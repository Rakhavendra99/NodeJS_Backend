
import Entity from '../entity';
import ResponseHandler from '../util/Response';
import HttpResponse from '../../src/util/HttpResponse';
import Methods from './Methods';
import { getUserIdByToken, postRequestParser } from '../util';
import Service from './authService';
import { ControllerLog as Log, Common as CommonLog } from '../util/Log';


// const {
//   PHONE_NOT_FOUND_ERR,

//   PHONE_ALREADY_EXISTS_ERR,
//   USER_NOT_FOUND_ERR,
//   INCORRECT_OTP_ERR,
//   ACCESS_DENIED_ERR,
// } = require("./error");

// const { createJwtToken } = require("../util/token");

// const { generateOTP, fast2sms } = require("../util/otp");

// --------------------- create new user ---------------------------------
class createUser {
  async createNewUser(req, res) {
    const methodName = Methods.GET_TOKEN;
    Log.MethodEnter(methodName);
    try {
      CommonLog.INFO('Received Create New User');
      const data = postRequestParser(req)
      const response = await Service.createNewUserServices(data);
      Log.MethodExit(methodName);
      await HttpResponse(res, response);
    } catch (error) {
      CommonLog.ERROR(error);
      Log.MethodExit(methodName);
      return HttpResponse(res, ResponseHandler.failure(methodName))
    }
  }

  async loginWithEamil(req, res) {
    const methodName = Methods.USER_TOKEN;
    Log.MethodEnter(methodName);
    try {
      CommonLog.INFO('Received Login With Eamil and password');
      const data = postRequestParser(req)
      const response = await Service.loginWithEamilServices(data);
      Log.MethodExit(methodName);
      await HttpResponse(res, response);
    } catch (error) {
      CommonLog.ERROR(error);
      Log.MethodExit(methodName);
      return HttpResponse(res, ResponseHandler.failure(methodName))
    }
  }

  async forgetPassword(req, res) {
    const methodName = Methods.FORGET_PASSWORD;
    Log.MethodEnter(methodName);
    try {
      CommonLog.INFO('Received Forget password');
      const data = postRequestParser(req)
      const response = await Service.forgetPasswordServices(data);
      Log.MethodExit(methodName);
      await HttpResponse(res, response);
    } catch (error) {
      CommonLog.ERROR(error);
      Log.MethodExit(methodName);
      return HttpResponse(res, ResponseHandler.failure(methodName))
    }
  }

  async verifyForgetOtp(req, res) {
    const methodName = Methods.VERIFY_FORGET_OTP;
    Log.MethodEnter(methodName);
    try {
      CommonLog.INFO('Received Verify Forget OTP');
      const data = postRequestParser(req)
      const response = await Service.verifyForgetOtpServices(data);
      Log.MethodExit(methodName);
      await HttpResponse(res, response);
    } catch (error) {
      CommonLog.ERROR(error);
      Log.MethodExit(methodName);
      return HttpResponse(res, ResponseHandler.failure(methodName))
    }
  }

  async resetPassword(req, res) {
    const methodName = Methods.RESET_PASSWORD;
    Log.MethodEnter(methodName);
    try {
      CommonLog.INFO('Received Reset Password');
      const data = postRequestParser(req)
      const response = await Service.resetPasswordServices(data);
      Log.MethodExit(methodName);
      await HttpResponse(res, response);
    } catch (error) {
      CommonLog.ERROR(error);
      Log.MethodExit(methodName);
      return HttpResponse(res, ResponseHandler.failure(methodName))
    }
  }

  async changePassword(req, res) {
    const methodName = Methods.CHANGE_PASSWORD;
    Log.MethodEnter(methodName);
    try {
      CommonLog.INFO('Received Change Password');
      const data = postRequestParser(req)
      const userId = getUserIdByToken(req)
      const response = await Service.changePasswordServices(data, userId);
      Log.MethodExit(methodName);
      await HttpResponse(res, response);
    } catch (error) {
      CommonLog.ERROR(error);
      Log.MethodExit(methodName);
      return HttpResponse(res, ResponseHandler.failure(methodName))
    }
  }
}
export default new createUser()


// exports.createNewUser = async (req, res, next) => {
//   try {
//     let { phone, name } = req.body;
//     // check duplicate phone Number
//     const phoneExist = await Entity.Users.findOne({
//       where: {
//         phone: phone
//       }
//     });

//     if (phoneExist) {
//       res.status(400).json({
//         type: "error",
//         message: "Phone number already exists",
//         data: {},
//       });
//       return;
//     }

//     // generate otp
//     const otp = generateOTP(4);
//     // save otp to user collection
//     let phoneOtp = otp;

//     // create new user
//     const createdUser = await Entity.Users.create(Object.assign({}, { phone, name, phoneOtp }));

//     res.status(200).json({
//       type: "success",
//       message: "Account created OTP sended to mobile number",
//       data: {
//         userId: createdUser.id,
//       },
//     });
//     console.log(createdUser)
//     // send otp to phone number
//     // await fast2sms(
//     //   {
//     //     message: `Your OTP is ${otp}`,
//     //     contactNumber: createdUser.phone,
//     //   },
//     //   next
//     // );
//   } catch (error) {
//     next(error);
//   }
// };



// ------------ login with phone otp ----------------------------------

// exports.loginWithPhoneOtp = async (req, res, next) => {
//   try {

//     const { phone } = req.body;
//     const user = await Entity.Users.findOne({
//       where: {
//         phone: phone
//       }
//     });

//     if (!user) {
//       res.status(400).json({
//         type: "error",
//         message: "Phone number not found",
//         data: {},
//       });
//       return;
//     }

//     // res.status(201).json({
//     //   type: "success",
//     //   message: "OTP sended to your registered phone number",
//     //   data: {
//     //     userId: user.id,
//     //   },
//     // });

//     // generate otp
//     const otp = generateOTP(4);
//     // save otp to user collection
//     user.phoneOtp = otp;

//     await user.save();
//     // send otp to phone number
//     // await fast2sms(
//     //   {
//     //     message: `Your OTP is ${otp}`,
//     //     contactNumber: user.phone,
//     //   },
//     //   next
//     // );
//     res.status(200).json({
//       type: "success",
//       message: "OTP sent to mobile number",
//       data: {
//         userId: user.id,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// ---------------------- verify phone otp -------------------------

// exports.verifyPhoneOtp = async (req, res, next) => {
//   try {
//     const { otp, userId } = req.body;
//     const user = await Entity.Users.findOne({
//       where: { id: userId }
//     });
//     if (!user) {
//       res.status(400).json({
//         type: "error",
//         message: "User not found",
//         data: {},
//       });
//       return;
//     }

//     if (user.phoneOtp !== otp) {
//       res.status(400).json({
//         type: "error",
//         message: "Incorrect otp",
//         data: {},
//       });

//       return;
//     }
//     const token = createJwtToken({ userId: user.id });

//     user.phoneOtp = "";
//     // user.isAccountVerified = true;
//     await user.update(Object.assign({}, user));

//     res.status(201).json({
//       type: "success",
//       message: "OTP verified successfully",
//       data: {
//         token,
//         userId: user._id,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;


    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- admin access only -------------------------

exports.handleAdmin = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "Okay you are admin!!",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
