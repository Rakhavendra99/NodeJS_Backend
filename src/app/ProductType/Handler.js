import Methods from "./Methods";
import Service from './Services';
import HttpResponse from '../../util/HttpResponse';
import ResponseHandler from '../../util/Response';
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';
import { getRequestParser, postRequestParser } from "../../util";
import path from 'path';

class PaymentsHandler {
    async getProductTypeList(req, res) {
        const methodName = Methods.GET_PRODUCTTYPE_LIST;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Product type List');
            const response = await Service.getProductTypeListServices();
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async getProductTypeDetails(req, res) {
        const methodName = Methods.GET_PRODUCTTYPE_DETAILS;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Product Type Details');
            const data = getRequestParser(req)
            const response = await Service.getProductTypeDetailsServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async saveProductType(req, res) {
        const methodName = Methods.SAVE_PRODUCTTYPE;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Save Product Type');
            const data = postRequestParser(req);
            const response = await Service.saveProductTypeServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async updateProductType(req, res) {
        const methodName = Methods.UPDATE_PRODUCTTYPE;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Update Product Type');
            const data = postRequestParser(req);
            const response = await Service.updateProductTypeServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async deleteProductType(req, res) {
        const methodName = Methods.DELETE_PRODUCTTYPE;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Delete Product Type');
            const data = getRequestParser(req)
            const response = await Service.deleteProductTypeServices(data);
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