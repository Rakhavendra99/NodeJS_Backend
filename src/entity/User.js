"use strict";

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            field: 'id',
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING(50),
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING(50),
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(50),
        },
        phone: {
            field:'phone',
            type: DataTypes.STRING(15),
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(255),
        },
        phoneOtp:{
            field:'phone_otp',
            type: DataTypes.STRING(6),
        },
        emailOtp: {
            field: 'email_otp',
            type: DataTypes.STRING(6),
        },
        forgetOtp: {
            field: 'forget_otp',
            type: DataTypes.STRING(6),
        },
        isPhoneOtp: {
            field: 'is_phone_otp',
            type: DataTypes.TINYINT,
        },
        isEmailOtp: {
            field: 'is_email_otp',
            type: DataTypes.TINYINT,
        },
        isForgetOtp: {
            field: 'is_forget_otp',
            type: DataTypes.TINYINT,
        },
        isActive: {
            field: 'is_Active',
            type: DataTypes.TINYINT,
        },
        countryId: {
            field: 'country_id',
            type: DataTypes.BIGINT,
        },
        otpExpireTime: {
            field: 'otp_expiry_time',
            type: DataTypes.DATE,
        },
        createdDate: {
            field: 'created_date',
            type: DataTypes.DATE,
        },
        updatedDate: {
            field: 'updated_date',
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'user',
        timestamps: false,
        underscored: true,

        classMethods: {

        }
    });
    User.associate = function associate(models) {
        User.belongsTo(models.Country, {
            foreignKey: 'countryId'
        });
        
    }
    return User;
}