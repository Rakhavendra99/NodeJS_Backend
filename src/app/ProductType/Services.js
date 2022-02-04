import Entity from '../../entity';
import ResponseHandler from '../../util/Response';
import Methods from "./Methods";
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';


class RoutesService {
    async getProductTypeListServices() {
        const methodName = Methods.GET_PRODUCTTYPE_LIST;
        Log.MethodEnter(methodName);
        try {
            let productTypeList = await Entity.ProductType.findAll({

            })
            return ResponseHandler.success(methodName, productTypeList)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async getProductTypeDetailsServices(data) {
        const methodName = Methods.GET_PRODUCTTYPE_DETAILS;
        Log.MethodEnter(methodName);
        try {
            let productTypeDetails = await Entity.ProductType.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!productTypeDetails) {
                return ResponseHandler.forbidden(methodName, 'Product Type not found ');
            }
            return ResponseHandler.success(methodName, productTypeDetails)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }


    async saveProductTypeServices(data) {
        const methodName = Methods.SAVE_PRODUCTTYPE;
        Log.MethodEnter(methodName);
        try {
            let findProductType = await Entity.ProductType.findOne({
                where: {
                    productType: data.productType
                }
            })
            let typeDetails = findProductType && findProductType.toJSON();
            if(typeDetails){
                return ResponseHandler.forbidden(methodName, 'Product Type Already taken');
            }
            data.isActive = 1
            let saveProductType = await Entity.ProductType.create(Object.assign({}, data))
            return ResponseHandler.success(methodName, saveProductType)
        }
        catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async updateProductTypeServices(data) {
        const methodName = Methods.UPDATE_PRODUCTTYPE;
        Log.MethodEnter(methodName);
        try {
            let findId = await Entity.ProductType.findOne({
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

    async deleteProductTypeServices(data) {
        const methodName = Methods.DELETE_PRODUCTTYPE;
        Log.MethodEnter(methodName);
        try {
            let del = await Entity.ProductType.findOne({
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