import Entity from '../../entity';
import ResponseHandler from '../../util/Response';
import Methods from "./Methods";
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';


class RoutesService {
    async getProductListServices() {
        const methodName = Methods.GET_PRODUCT_LIST;
        Log.MethodEnter(methodName);
        try {
            let productList = await Entity.Product.findAll({

            })
            return ResponseHandler.success(methodName, productList)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async getProductDetailsServices(data) {
        const methodName = Methods.GET_PRODUCT_DETAILS;
        Log.MethodEnter(methodName);
        try {
            let productDetails = await Entity.Product.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!productDetails) {
                return ResponseHandler.forbidden(methodName, 'Product  not found ');
            }
            return ResponseHandler.success(methodName, productDetails)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }


    async saveProductServices(data) {
        const methodName = Methods.SAVE_PRODUCT;
        Log.MethodEnter(methodName);
        try {
            let findProductType = await Entity.ProductType.findOne({
                where: {
                    id: data.productTypeId
                }
            })
            if (!findProductType) {
                return ResponseHandler.forbidden(methodName, 'Product Type Id not found');
            }
            let findProduct = await Entity.Product.findOne({
                where: {
                    productName: data.productName
                }
            })
            let productDetails = findProduct && findProduct.toJSON()
            if (productDetails) {
                return ResponseHandler.forbidden(methodName, 'Product name already taken');
            }

            let saveProduct = await Entity.Product.create(Object.assign({}, data))
            return ResponseHandler.success(methodName, saveProduct)
        }
        catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async updateProductServices(data) {
        const methodName = Methods.UPDATE_PRODUCT;
        Log.MethodEnter(methodName);
        try {
            let findId = await Entity.Product.findOne({
                where: {
                    id: data.id
                }
            })
            if (!findId) {
                return ResponseHandler.forbidden(methodName, 'Id is not found, So cannot update the value')
            }
            findId.update(Object.assign({}, data))
            return ResponseHandler.success(methodName, findId)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async deleteProductServices(data) {
        const methodName = Methods.DELETE_PRODUCT;
        Log.MethodEnter(methodName);
        try {
            let del = await Entity.Product.findOne({
                where: { id: data.id }
            })
            if (!del) {
                return ResponseHandler.forbidden(methodName, 'Id is not found, So cannot delete the value')
            }
            del.destroy(Object.assign({}, data))
            return ResponseHandler.success(methodName, del)

        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }



}




export default new RoutesService();