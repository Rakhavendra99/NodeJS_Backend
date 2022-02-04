import Entity from '../../entity';
import ResponseHandler from '../../util/Response';
import Methods from "./Methods";
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';


class RoutesService {
    async getUserListServices() {
        const methodName = Methods.GET_USER_LIST;
        Log.MethodEnter(methodName);
        try {
            let userList = await Entity.User.findAll({

            })
            return ResponseHandler.success(methodName, userList)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async getUserDetailsServices(data) {
        const methodName = Methods.GET_USER_DETAILS;
        Log.MethodEnter(methodName);
        try {
            let userDetails = await Entity.User.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!userDetails) {
                return ResponseHandler.forbidden(methodName, 'User not found ');
            }
            return ResponseHandler.success(methodName, userDetails)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }


    async saveUserServices(data) {
        const methodName = Methods.SAVE_USER;
        Log.MethodEnter(methodName);
        try {
            let findUser = await Entity.User.findOne({
                where: {
                    email: data.email
                }

            })
            const userDetails = findUser && findUser.toJSON()
            if (userDetails) {
                return ResponseHandler.forbidden(methodName, 'Email id already taken');
            } else {
                let saveUser = await Entity.User.create(Object.assign({}, data))

                return ResponseHandler.success(methodName, saveUser)
            }
        }
        catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async updateUserServices(data) {
        const methodName = Methods.UPDATE_USER;
        Log.MethodEnter(methodName);
        try {
            let findId = await Entity.User.findOne({
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

    async deleteUserServices(data) {
        const methodName = Methods.DELETE_USER;
        Log.MethodEnter(methodName);
        try {
            let del = await Entity.User.findOne({
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