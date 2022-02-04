'use strict';

import oauthServer from './oauth2-server';
import timediff from 'timediff';
import oauth from './oauth';
import config from '../config';
import Entity from '../entity'
import ResponseHandler from '../util/Response';
import { CONSTANTS, UserRoles } from '../config/Constants';
import { encryptPass, postRequestParser } from '../util';
// import { notificationEnv } from '../util/PushNotification';
var Request = oauthServer.Request;
var Response = oauthServer.Response;

module.exports = function (server) {
    server.post('/api/oauth/token', function (request, reply) {
        var req = new Request(request);
        var resp = new Response(reply);
        req.method = 'POST';
        req.body = request.body;
        oauth
            .token(req, resp)
            .then(async function (token) {
                var tokenResp = new Object();
                tokenResp['access_token'] = token.accessToken;
                tokenResp['refresh_token'] = token.refresh_token;
                tokenResp['token_type'] = token.accessToken ? 'Bearer' : '';
                var diffTime = timediff(new Date(), new Date(token.accessTokenExpiresAt), 'S');
                tokenResp['expires_in'] = diffTime.seconds;
                tokenResp['scope'] = token.scope;
                // let Environment = notificationEnv(process.env.NODE_ENV)
                if (token.refresh_token) {
                    var userResp = token.user;
                    delete userResp.password
                    delete userResp.phoneOtp
                    tokenResp['pushId'] = `${Environment}${token.user.id}`
                    let role = await Entity.Roles.findOne({
                        where: {
                            id: token.user.roleId
                        }
                    })
                    let userProfile = await Entity.UserProfile.findOne({
                        where: {
                            userId: token.user.id
                        }
                    })
                    tokenResp['user'] = token.user;
                    token.user.UserProfile = userProfile;
                    token.user.Role = role;
                }
                reply.status(config.responseCode.SUCCESS)
                return reply.send(tokenResp);
            }).catch(function (err) {
                reply.status(config.responseCode.UNAUTHORIZED)
                return reply.send({ error: err.message });
            })
    });
    server.post('/api/oauth/verify_otp', async function (request, reply) {
        var req = new Request(request);
        var resp = new Response(reply);
        req.method = 'POST';
        const data = postRequestParser(req);
        const { phoneOtp, phone, countryCode } = data;
        const user = await Entity.Users.findOne({
            where: {
                phone: phone,
                countryCode: countryCode
            },
            include: [
                { model: Entity.Roles },
                { model: Entity.UserProfile },
            ]
        });
        if (!user) {
            return reply.send(ResponseHandler.userNotFound("Get Accesss Token", {}, "User not found"));
        }
        if (user.roleId === UserRoles.USER) {
            if (user.phoneOtp != phoneOtp) {
                return reply.send(ResponseHandler.otpInvalid("Get Accesss Token", {}, "Invalid Otp"));
            }
        }
        var diffTime = timediff(new Date(), new Date(user.otpExpireTime), 'S');
        if (diffTime.seconds < CONSTANTS.OTP_EXPIRE_TIME) {
            return reply.send(ResponseHandler.userNotFound("Verify OTP", {}, "Your OTP has been expired"));
        }
        oauth
            .tokenByOTP(req, resp)
            .then(async function (token) {
                var tokenResp = new Object();
                tokenResp['access_token'] = token.accessToken;
                tokenResp['refresh_token'] = token.refresh_token;
                tokenResp['token_type'] = token.accessToken ? 'Bearer' : '';
                var diffTime = timediff(new Date(), new Date(token.accessTokenExpiresAt), 'S');
                tokenResp['expires_in'] = diffTime.seconds;
                tokenResp['scope'] = token.scope;
                // let Environment = notificationEnv(process.env.NODE_ENV)
                if (token.refresh_token) {
                    var userResp = token.user;
                    delete userResp.password
                    delete userResp.phoneOtp
                    tokenResp['pushId'] = `${Environment}${token.user.id}`
                    let role = await Entity.Roles.findOne({
                        where: {
                            id: token.user.roleId
                        }
                    })
                    let userProfile = await Entity.UserProfile.findOne({
                        where: {
                            userId: token.user.id
                        }
                    })
                    if (user.roleId === UserRoles.USER) {
                        let user = await Entity.Users.findOne({
                            where: {
                                id: token.user.id
                            }
                        })
                        user.isVerified = 1
                        user.updatedDate = new Date()
                        await user.save();
                    }
                    tokenResp['user'] = token.user;
                    token.user.UserProfile = userProfile;
                    token.user.Role = role;
                }
                reply.status(config.responseCode.SUCCESS)
                return reply.send(ResponseHandler.success("Get Accesss Token", tokenResp));
            }).catch(function (err) {
                reply.status(config.responseCode.UNAUTHORIZED)
                return reply.send(ResponseHandler.forbidden("Get Accesss Token", err.message));
            })
    });
    server.post('/api/oauth/verify_password', async function (request, reply) {
        var req = new Request(request);
        var resp = new Response(reply);
        req.method = 'POST';
        const data = postRequestParser(req);
        const { password, email } = data;
        const user = await Entity.User.findOne({
            where: {
                email: email,
            }
        });
        if (!user) {
            return reply.send(ResponseHandler.userNotFound("Get Accesss Token", {}, "User not found"));
        }
        if (user.password !== encryptPass(password)) {
            return reply.send(ResponseHandler.otpInvalid("Get Accesss Token", {}, "Invalid Password"));
        }
        oauth
            .tokenByOTP(req, resp)
            .then(async function (token) {
                var tokenResp = new Object();
                tokenResp['access_token'] = token.accessToken;
                tokenResp['refresh_token'] = token.refresh_token;
                tokenResp['token_type'] = token.accessToken ? 'Bearer' : '';
                var diffTime = timediff(new Date(), new Date(token.accessTokenExpiresAt), 'S');
                tokenResp['expires_in'] = diffTime.seconds;
                tokenResp['scope'] = token.scope;
                // let Environment = notificationEnv(process.env.NODE_ENV)
                if (token.refresh_token) {
                    var userResp = token.user;
                    delete userResp.password
                    delete emailOtp.emailOtp
                    delete forgetOtp.forgetOtp
                    // tokenResp['pushId'] = `${Environment}${token.user.id}`
                    tokenResp['user'] = token.user;
                }
                reply.status(config.responseCode.SUCCESS)
                return reply.send(ResponseHandler.success("Get Accesss Token", tokenResp));
            }).catch(function (err) {
                reply.status(config.responseCode.UNAUTHORIZED)
                return reply.send(ResponseHandler.forbidden("Get Accesss Token", err.message));
            })
    });
}