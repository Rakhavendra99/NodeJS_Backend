import Methods from "./Methods";
import Service from './Services';
import HttpResponse from '../../util/HttpResponse';
import ResponseHandler from '../../util/Response';
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';
import { getRequestParser, postRequestParser } from "../../util";
import path from 'path';

class PaymentsHandler {
    async getCountryList(req, res) {
        const methodName = Methods.GET_COUNTRY_LIST;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Country List');
            const response = await Service.getCountryListServices();
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async getCountryDetails(req, res) {
        const methodName = Methods.GET_COUNTRY_DETAILS;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Country Details');
            const data = getRequestParser(req)
            const response = await Service.getCountryDetailsServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async saveCountry(req, res) {
        const methodName = Methods.SAVE_COUNTRY;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Save Country');
            const data = postRequestParser(req);
            const response = await Service.saveCountryServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async updateCountry(req, res) {
        const methodName = Methods.UPDATE_COUNTRY;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Update Country');
            const data = postRequestParser(req);
            const response = await Service.updateCountryServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async deleteCountry(req, res) {
        const methodName = Methods.DELETE_COUNTRY;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Delete Country');
            const data = postRequestParser(req)
            const response = await Service.deleteCountryServices(data);
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