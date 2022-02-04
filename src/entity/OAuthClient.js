"use strict";

module.exports = function AppModel(sequelize, DataTypes) {
    const OAuthClient = sequelize.define('OAuthClient', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: DataTypes.STRING(255),
        client_id: DataTypes.STRING(80),
        client_secret: DataTypes.STRING(80),
        redirect_uri: DataTypes.STRING(2000),
        grant_types: DataTypes.STRING(80),
        scope: DataTypes.STRING(255)
    }, {
        tableName: 'oauth_clients',
        timestamps: false,
        underscored: true,

        classMethods: { },
    });

    OAuthClient.associate = function associate(models) {
        OAuthClient.belongsTo(models.OAuthUser, {
            foreignKey: 'user_id',
        });
        // OAuthClient.hasMany(models.OAuthClient, {
        //     foreignKey: 'client_id',
        // });
    };

    return OAuthClient;
};