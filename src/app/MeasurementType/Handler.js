import Methods from "./Methods";
import Service from './Services';
import HttpResponse from '../../util/HttpResponse';
import ResponseHandler from '../../util/Response';
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';
import { getRequestParser, postRequestParser } from "../../util";
import path from 'path';

class PaymentsHandler {
    async getMeasurementTypeList(req, res) {
        const methodName = Methods.GET_MEASUREMENTTYPE_LIST;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Measurement Type List');
            const response = await Service.getMeasurementTypeListServices();
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async getMeasurementTypeDetails(req, res) {
        const methodName = Methods.GET_MEASUREMENTTYPE_DETAILS;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get Measurement Type Details');
            const data = getRequestParser(req)
            const response = await Service.getMeasurementTypeDetailsServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async saveMeasurementType(req, res) {
        const methodName = Methods.SAVE_MEASUREMENTTYPE;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Save Measurement Type');
            const data = postRequestParser(req);
            const response = await Service.saveMeasurementTypeServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async updateMeasurementType(req, res) {
        const methodName = Methods.UPDATE_MEASUREMENTTYPE;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Update Measurement Type');
            const data = postRequestParser(req);
            const response = await Service.updateMeasurementTypeServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async deleteMeasurementType(req, res) {
        const methodName = Methods.DELETE_MEASUREMENTTYPE;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Delete Measurement Type');
            const data = getRequestParser(req)
            const response = await Service.deleteMeasurementTypeServices(data);
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