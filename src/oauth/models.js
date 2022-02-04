const { Op } = require("sequelize");
import { encryptPass } from '../util';
import _ from 'lodash';
import split from 'string-split';
import inArray from 'in-array';
import config from '../config';
import { UserRoles } from '../config/Constants';
var Entity = require('../entity');

function getAccessToken(bearerToken) {
    return Entity.OAuthAccessToken
        .findOne({
            where: {
                access_token: bearerToken
            },
            attributes: [
                ['access_token', 'accessToken'],
                ['expires', 'accessTokenExpiresAt'], 'scope'
            ],
            include: [
                {
                    model: Entity.OAuthUser,
                },
                { model: Entity.OAuthClient }
            ],
        })
        .then(function (accessToken) {
            if (!accessToken) return false;
            var token = accessToken.toJSON();
            token.user = token.OAuthUser;
            token.client = token.OAuthClient;
            token.scope = token.scope
            return token;
        })
        .catch(function (err) {
            console.log("getAccessToken - Err: " + err)
        });
}

function getClient(clientId, clientSecret, grantType) {
    const options = {
        where: {
            client_id: clientId
        },
        attributes: ['id', 'client_id', 'redirect_uri', 'grant_types', 'scope'],
    };
    if (clientSecret) options.where.client_secret = clientSecret;
    return Entity.OAuthClient
        .findOne(options)
        .then(function (client) {
            if (!client) return new Error("client not found");
            var clientWithGrants = client.toJSON();
            var grants = split(" ", clientWithGrants.grant_types);
            if (!inArray(grants, grantType)) return new Error("No client found for grant_type");
            clientWithGrants.grants = ['authorization_code', 'password', 'refresh_token', 'client_credentials']
            clientWithGrants.redirectUris = [clientWithGrants.redirect_uri]
            delete clientWithGrants.redirect_uri;
            return clientWithGrants;

        }).catch(function (err) {
            console.log("getClient - Err: ", err)
        });
}

function getUser(username, password, client) {
    let userType = [];
    switch (client.client_id) {
        case 'admin':
            userType = [config.userType.Customer];
            break;
        default:
            userType = [];
            break;
    }
    return Entity.OAuthUser
        .findOne({
            where: {
                phone: username,
                roleId: {
                    [Op.in]: userType
                },
            }
        })
        .then(function (user) {
            var encPass = encryptPass(password);
            if (!user) {
                return false;
            }
            if (user && user.userType === 3) {
                if (user && user.isOtpVerified === 1 && user.password == encPass) {
                    return user.toJSON();
                } else {
                    return false;
                }
            } else
                if (user.password == encPass) {
                    return user.toJSON();
                } else {
                    return false;
                }
        })
        .catch(function (err) {
            console.log("getUser - Err: ", err)
        });
}

function getUserForOTP(username, otp, userType) {
    return Entity.OAuthUser
        .findOne({
            where: {
                phone: username,
                roleId: userType,
            }
        })
        .then(function (user) {
            if (!user) {
                return false;
            }
            if (user.phoneOtp == otp) {
                return user.toJSON();
            } else {
                return false;
            }
        })
        .catch(function (err) {
            console.log("getUserForOTP - Err: ", err)
        });
}

function getUserForPassword(email, password) {
    return Entity.OAuthUser
        .findOne({
            where: {
                email: email,
            }
        })
        .then(function (user) {
            if (!user) {
                return false;
            }
            if (user.password == encryptPass(password)) {
                return user.toJSON();
            } else {
                return false;
            }
        })
        .catch(function (err) {
            console.log("getUserForOTP - Err: ", err)
        });
}


function revokeAuthorizationCode(code) {
    return Entity.OAuthAuthorizationCode.findOne({
        where: {
            authorization_code: code.code
        }
    }).then(function (rCode) {
        var expiredCode = code
        expiredCode.expiresAt = new Date('2015-05-28T06:59:53.000Z')
        return expiredCode
    }).catch(function (err) {
        console.log("getUser - Err: ", err)
    });
}

function revokeToken(token) {
    return Entity.OAuthRefreshToken.findOne({
        where: {
            refresh_token: token.refreshToken
        }
    }).then(function (rT) {
        if (rT) rT.destroy();
        var expiredToken = token
        expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z')
        return expiredToken
    }).catch(function (err) {
        console.log("revokeToken - Err: ", err)
    });
}


function saveToken(token, client, user) {

    return Promise.all([
        Entity.OAuthAccessToken.create({
            access_token: token.accessToken,
            expires: token.accessTokenExpiresAt,
            client_id: client.id,
            user_id: user.id,
            scope: token.scope,
        }),
        token.refreshToken ? Entity.OAuthRefreshToken.create({
            refresh_token: token.refreshToken,
            expires: token.refreshTokenExpiresAt,
            client_id: client.id,
            user_id: user.id,
            scope: token.scope,
        }) : [],

    ])
        .then(function (resultsArray) {
            return _.assign(
                {
                    client: client,
                    user: user,
                    access_token: token.accessToken,
                    refresh_token: token.refreshToken,
                },
                token
            )
        })
        .catch(function (err) {
            console.log("revokeToken - Err: ", err)
        });
}

function getAuthorizationCode(code) {
    return Entity.OAuthAuthorizationCode
        .findOne({
            attributes: ['client_id', 'expires', 'user_id', 'scope'],
            where: {
                authorization_code: code
            },
            include: [Entity.OAuthUser, Entity.OAuthClient]
        })
        .then(function (authCodeModel) {
            if (!authCodeModel) return false;
            var client = authCodeModel.OAuthClient.toJSON()
            var user = authCodeModel.OAuthUser.toJSON()
            return reCode = {
                code: code,
                client: client,
                expiresAt: authCodeModel.expires,
                redirectUri: client.redirect_uri,
                user: user,
                scope: authCodeModel.scope,
            };
        }).catch(function (err) {
            console.log("getAuthorizationCode - Err: ", err)
        });
}

function saveAuthorizationCode(code, client, user) {
    return Entity.OAuthAuthorizationCode
        .create({
            expires: code.expiresAt,
            client_id: client.id,
            authorization_code: code.authorizationCode,
            user_id: user.id,
            scope: code.scope
        })
        .then(function () {
            code.code = code.authorizationCode
            return code
        }).catch(function (err) {
            console.log("saveAuthorizationCode - Err: ", err)
        });
}

function getUserFromClient(client) {
    var options = {
        where: {
            client_id: client.client_id
        },
        include: [Entity.OAuthUser],
        attributes: ['id', 'client_id', 'redirect_uri', 'grant_types'],
    };
    if (client.client_secret) options.where.client_secret = client.client_secret;

    return Entity.OAuthClient
        .findOne(options)
        .then(function (clients) {
            if (!clients) return false;
            if (!clients.User) return false;
            return clients.User.toJSON()
        }).catch(function (err) {
            console.log("getUserFromClient - Err: ", err)
        });
}

function getRefreshToken(refreshToken) {
    if (!refreshToken || refreshToken === 'undefined') return false

    return Entity.OAuthRefreshToken
        .findOne({
            attributes: ['client_id', 'user_id', 'expires'],
            where: {
                refresh_token: refreshToken
            },
            include: [Entity.OAuthUser, Entity.OAuthClient]
        })
        .then(function (savedRT) {
            var tokenTemp = {
                user: savedRT ? savedRT.User.toJSON() : {},
                client: savedRT ? savedRT.OAuthClient.toJSON() : {},
                refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
                refreshToken: refreshToken,
                refresh_token: refreshToken,
                scope: savedRT ? savedRT.scope : {}
            };
            return tokenTemp;

        }).catch(function (err) {
            console.log("getRefreshToken - Err: ", err)
        });
}

function validateScope(user, client, scope) {
    if (client.scope === scope) {
        return client.scope;
    }
    return false;
}



export default {
    getAccessToken,
    getAuthorizationCode,
    getClient,
    getRefreshToken,
    getUser,
    getUserFromClient,
    revokeAuthorizationCode,
    revokeToken,
    saveToken,
    saveAuthorizationCode,
    validateScope,
    getUserForOTP,
    getUserForPassword
}