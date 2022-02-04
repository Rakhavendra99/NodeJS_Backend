"use strict";

import { Sequelize } from "sequelize";
import config from "../config/dbconfig";

if (!config || !config.sql) {
    console.error('No database configurations available');
    process.exit(1);
}

const databaseconfig = config.sql;
var db = {
    sequelize: new Sequelize(
        databaseconfig.database,
        databaseconfig.username,
        databaseconfig.password,
        databaseconfig
    )
};
// db.sequelize.sync({force: true}) 

db.OAuthAccessToken = require('./OAuthAccessToken')(db.sequelize, Sequelize.DataTypes);
db.OAuthAuthorizationCode = require('./OAuthAuthorizationCode')(db.sequelize, Sequelize.DataTypes);
db.OAuthClient = require('./OAuthClient')(db.sequelize, Sequelize.DataTypes);
db.OAuthRefreshToken = require('./OAuthRefreshToken')(db.sequelize, Sequelize.DataTypes);
db.OAuthScope = require('./OAuthScope')(db.sequelize, Sequelize.DataTypes);
db.OAuthUser = require('./OAuthUser')(db.sequelize, Sequelize.DataTypes);


db.Country = require('./Country')(db.sequelize, Sequelize.DataTypes)
db.MeasurementType = require('./MeasurementType')(db.sequelize, Sequelize.DataTypes)
db.ProductType = require('./ProductType')(db.sequelize, Sequelize.DataTypes)
db.User = require('./User')(db.sequelize, Sequelize.DataTypes)
db.Product = require('./Product')(db.sequelize, Sequelize.DataTypes)


db.Query = db.sequelize
Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;