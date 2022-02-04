"use strict";

module.exports = function (sequelize, DataTypes) {
    const MeasurementType = sequelize.define('MeasurementType', {
        id: {
            field: 'id',
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        measurementName: {
            field: 'measurement_name',
            type: DataTypes.STRING(50),
        }, 
        isActive: {
            field: 'isActive',
            type: DataTypes.TINYINT,
        }

    }, {
        tableName: 'measurement_type',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });

    return MeasurementType;
}