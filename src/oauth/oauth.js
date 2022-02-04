'use strict';

import config from '../config';
import oauthServer from './oauth2-server';
import models from './models';

var oauth = new oauthServer({
    model: models,
    refreshTokenLifetime: config.oauthRefreshTokenTime, //1209601,
    accessTokenLifetime: config.oauthAccessTokenTime //3601*24*100
});

module.exports = oauth;