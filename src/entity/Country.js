"use strict";

module.exports = function (sequelize, DataTypes) {
    const Country = sequelize.define('Country', {
        id: {
            field: 'id',
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        countryCode: {
            field: 'country_code',
            type: DataTypes.STRING(50),
        },
        countryName: {
            field: 'country_name',
            type: DataTypes.STRING(50),
        },
        isActive: {
            field: 'isActive',
            type: DataTypes.TINYINT,
        }

    }, {
        tableName: 'country',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });

    Country.associate = function associate(models) {
        Country.hasOne(models.User, {
            foreignKey: 'countryId'
        });
    }

    return Country;
}