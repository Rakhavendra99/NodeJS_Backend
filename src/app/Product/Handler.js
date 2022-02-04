import Methods from "./Methods";
import Service from './Services';
import HttpResponse from '../../util/HttpResponse';
import ResponseHandler from '../../util/Response';
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';
import { getRequestParser, postRequestParser } from "../../util";
import path from 'path';

class PaymentsHandler {
    async getProductList(req, res) {
        const methodName = Methods.GET_PRODUCT_LIST;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Product List');
            const response = await Service.getProductListServices();
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async getProductDetails(req, res) {
        const methodName = Methods.GET_PRODUCT_DETAILS;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Product  Details');
            const data = getRequestParser(req)
            const response = await Service.getProductDetailsServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async saveProduct(req, res) {
        const methodName = Methods.SAVE_PRODUCT;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Save Product ');
            const data = postRequestParser(req);
            const response = await Service.saveProductServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async updateProduct(req, res) {
        const methodName = Methods.UPDATE_PRODUCT;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Update Product ');
            const data = postRequestParser(req);
            const response = await Service.updateProductServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async deleteProduct(req, res) {
        const methodName = Methods.DELETE_PRODUCT;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Delete Product ');
            const data = getRequestParser(req)
            const response = await Service.deleteProductServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }



}
export default new PaymentsHandler();