"use strict";

module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        id: {
            field: 'id',
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: false,
            autoIncrement: true
        },
        productTypeId: {
            field: 'product_type_id',
            type: DataTypes.BIGINT,
        },
        productName: {
            field: 'product_name',
            type: DataTypes.STRING(45),
        },
        productObject: {
            field: 'product_object',
            type: DataTypes.TEXT,
        },

    }, {
        tableName: 'product',
        timestamps: false,
        underscored: true,

        classMethods: {

        }

    });

    Product.associate = function associate(models) {
        Product.belongsTo(models.ProductType, {
            foreignKey: 'productTypeId'
        });
    }

    return Product;
}