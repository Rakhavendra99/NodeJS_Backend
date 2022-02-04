'use strict';

import ProcessRoutes from './ProcessRoutes';
import express from 'express';
import RouterOptions from '../config/RouterOptions';
import authHandler from './authHandler'
import Methods from './Methods';
import { userRegistrationValidation, verifyOtpValidation, loginWithEamilValidation, forgetPasswordValidation, resetPasswordValidation, changePasswordValidation, userValidation, refreshTokenValidation } from '../validation/OauthValidation'
import { MediaType } from '../config/Constants';
/**
 * Module dependencies.
 */
// const { MediaType } = require('../config/Constants');
// const authHandler = require('./authHandler');
// const Methods = require('./Methods')
// const { userRegistrationValidation, phoneOtpValidation, loginWithPhoneValidation, userValidation, refreshTokenValidation} = require('../validation/OauthValidation')
import requestValidator from '../middlewares/requestValidator'
import { authenticateUser } from '../oauth/authenticate';
// import { from } from 'form-data';

export default [
    {
        path: '/register',
        type: MediaType.POST,
        method: authHandler.createNewUser,
        middleware: [requestValidator(Methods.GET_TOKEN, userRegistrationValidation)],
        options: {}
    },
    {
        path: '/login_with_email',
        type: MediaType.POST,
        method: authHandler.loginWithEamil,
        middleware: [requestValidator(Methods.USER_TOKEN, loginWithEamilValidation)],
        options: {}
    },
    {
        path: '/forget_password',
        type: MediaType.POST,
        method: authHandler.forgetPassword,
        middleware: [requestValidator(Methods.FORGET_PASSWORD, forgetPasswordValidation)],
        options: {}
    },
    {
        path: '/verify_otp',
        type: MediaType.POST,
        method: authHandler.verifyForgetOtp,
        middleware: [requestValidator(Methods.VERIFY_FORGET_OTP, verifyOtpValidation)],
        options: {}
    },
    {
        path: '/reset_password',
        type: MediaType.POST,
        method: authHandler.resetPassword,
        middleware: [requestValidator(Methods.RESET_PASSWORD, resetPasswordValidation)],
        options: {}
    },
    {
        path: '/change_password',
        type: MediaType.POST,
        method: authHandler.changePassword,
        middleware: [authenticateUser(), requestValidator(Methods.RESET_PASSWORD, changePasswordValidation)],
        options: {}
    },
    // {
    //     path: '/me',
    //     type: MediaType.POST,
    //     method: authHandler.fetchCurrentUser,
    //     // middleware: [requestValidator(Methods.REFRESH_TOKEN, phoneOtpValidation)],
    //     options: {}
    // }
]
