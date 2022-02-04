"use strict";

module.exports = function (sequelize, DataTypes) {
    const ProductType = sequelize.define('ProductType', {
        id: {
            field: 'id',
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        productType: {
            field: 'product_type',
            type: DataTypes.STRING(50),
        },
        isActive: {
            field: 'isActive',
            type: DataTypes.TINYINT,
        }

    }, {
        tableName: 'product_type',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });

    ProductType.associate = function associate(models) {
        ProductType.hasOne(models.Product, {
            foreignKey: 'productTypeId'
        });
    }

    return ProductType;
    
}