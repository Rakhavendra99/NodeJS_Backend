'use strict';

import models from './models';
import split from 'string-split';
import inArray from 'in-array';
import config from '../config';
import ResponseHandler from '../util/Response';

export const authenticateUser = (options) => {
    var options = options || {};
    return (request, response, next) => {
        console.log(request.headers.authorization)
        var token = request.headers.authorization && request.headers.authorization.match(/Bearer\s(\S+)/) && request.headers.authorization.match(/Bearer\s(\S+)/)[1];
        if (!token) {
            response.status(401)
            response.send(ResponseHandler.forbidden("Get Accesss Token", "Invalid Token"))
            return;
        }
        models.getAccessToken(token)
            .then(function (accessToken) {
                if (!accessToken) {
                    response.status(401)
                    response.send({ error: 'Invalid token' })
                    return
                }
                if (accessToken.accessTokenExpiresAt && !(accessToken.accessTokenExpiresAt instanceof Date)) {
                    response.status(401)
                    response.send(ResponseHandler.forbidden("Get Accesss Token", "Server error: `expires` must be a Date instance"))
                    return;
                }

                if (accessToken.accessTokenExpiresAt && accessToken.accessTokenExpiresAt < new Date()) {
                    response.status(401)
                    response.send(ResponseHandler.forbidden("Get Accesss Token", "Invalid token: access token has expired"))
                    return;
                }
                var grants = split(" ", accessToken.client.grant_types);
                var pathArray = split("/", request.path);

                if (!inArray(grants, 'password')) {
                    response.status(401)
                    response.send(ResponseHandler.forbidden("Get Accesss Token", "Unauthorized"))
                    return;
                }
                if (pathArray[2] == 'users') {
                    if (accessToken.user.roleId != config.userType.Customer) {
                        response.status(401)
                        response.send(ResponseHandler.forbidden("Get Accesss Token", "Unauthorized"))
                        return;
                    }
                }
                request.user = accessToken.User;
                next();
                return;
            })
            .catch(function (err) {
                response.status(401)
                response.send(ResponseHandler.failure("Get Accesss Token", "Invalid token"))
                return;
            });
    }
}

export const authenticate = function (options) {
    var options = options || {};
    return (request, response, next) => {
        var token = request.headers.authorization && request.headers.authorization.match(/Bearer\s(\S+)/) && request.headers.authorization.match(/Bearer\s(\S+)/)[1];
        if (!token) {
            response.status(401)
            response.send({ error: 'Invalid token' })
            return;
        }
        models.getAccessToken(token)
            .then(function (accessToken) {
                if (!accessToken) {
                    response.status(401)
                    response.send({ error: 'Invalid token' })
                    return
                }
                if (accessToken.accessTokenExpiresAt && !(accessToken.accessTokenExpiresAt instanceof Date)) {
                    response.status(401)
                    response.send({ error: 'Server error: `expires` must be a Date instance' })
                    return;
                }

                if (accessToken.accessTokenExpiresAt && accessToken.accessTokenExpiresAt < new Date()) {
                    response.status(401)
                    response.send({ error: 'Invalid token: access token has expired' })
                    return;
                }
                request.user = accessToken.user;
                next();
                return;
            })
            .catch(function (err) {
                response.status(401)
                response.send({ error: 'Invalid token' })
                return;
            });
    }
}