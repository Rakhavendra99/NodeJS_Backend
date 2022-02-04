"use strict";

module.exports = function OAuthRefreshTokenModel(sequelize, DataTypes) {
    const OAuthRefreshToken = sequelize.define('OAuthRefreshToken', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        refresh_token: DataTypes.STRING(256),
        expires: DataTypes.DATE,
        scope: DataTypes.STRING(255)
    }, {
        tableName: 'oauth_refresh_tokens',
        timestamps: false,
        underscored: true,
        classMethods: { }
    });

    OAuthRefreshToken.associate = function associate(models) {
        OAuthRefreshToken.belongsTo(models.OAuthClient, {
            foreignKey: 'client_id',
        });
        OAuthRefreshToken.belongsTo(models.OAuthUser, {
            foreignKey: 'user_id',
        });

        // OAuthRefreshToken.belongsTo(models.OAuthScope, {
        //     foreignKey: 'scope',
        // });
    };

    return OAuthRefreshToken;
};