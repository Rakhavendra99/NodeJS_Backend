import Methods from "./Methods";
import Service from './Services';
import HttpResponse from '../../util/HttpResponse';
import ResponseHandler from '../../util/Response';
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';
import { getRequestParser, postRequestParser } from "../../util";
import path from 'path';

class PaymentsHandler {
    async getUserList(req, res) {
        const methodName = Methods.GET_USER_LIST;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get User List');
            const response = await Service.getUserListServices();
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async getUserDetails(req, res) {
        const methodName = Methods.GET_USER_DETAILS;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Get User Details');
            const data = getRequestParser(req)
            const response = await Service.getUserDetailsServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }


    async saveUser(req, res) {
        const methodName = Methods.SAVE_USER;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Save User');
            const data = postRequestParser(req);
            const response = await Service.saveUserServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async updateUser(req, res) {
        const methodName = Methods.UPDATE_USER;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Update User');
            const data = postRequestParser(req);
            const response = await Service.updateUserServices(data);
            Log.MethodExit(methodName);
            await HttpResponse(res, response);
        } catch (error) {
            CommonLog.ERROR(error);
            Log.MethodExit(methodName);
            return HttpResponse(res, ResponseHandler.failure(methodName))
        }
    }

    async deleteUser(req, res) {
        const methodName = Methods.DELETE_USER;
        Log.MethodEnter(methodName);
        try {
            CommonLog.INFO('Received Delete User');
            const data = getRequestParser(req)
            const response = await Service.deleteUserServices(data);
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