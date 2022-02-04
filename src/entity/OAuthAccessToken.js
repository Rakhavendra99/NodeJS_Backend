"use strict";

module.exports = function(sequelize, DataTypes) {
    const OAuthAccessToken = sequelize.define('OAuthAccessToken', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        access_token: DataTypes.STRING(256),
        expires: DataTypes.DATE,
        scope: DataTypes.STRING(255)
    }, {
        tableName: 'oauth_access_tokens',
        timestamps: false,
        underscored: true,
        classMethods: { },
    });

    OAuthAccessToken.associate = function associate(models) {
        OAuthAccessToken.belongsTo(models.OAuthClient, {
            foreignKey: 'client_id',
        });
        OAuthAccessToken.belongsTo(models.OAuthUser, {
            foreignKey: 'user_id',
        });
    };

    return OAuthAccessToken;
};