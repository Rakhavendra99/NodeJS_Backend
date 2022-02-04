import Entity from '../../entity';
import ResponseHandler from '../../util/Response';
import Methods from "./Methods";
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';


class RoutesService {
    async getMeasurementTypeListServices() {
        const methodName = Methods.GET_MEASUREMENTTYPE_LIST;
        Log.MethodEnter(methodName);
        try {
            let measurementTypeList = await Entity.MeasurementType.findAll({
                
            })
            return ResponseHandler.success(methodName, measurementTypeList)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async getMeasurementTypeDetailsServices(data) {
        const methodName = Methods.GET_MEASUREMENTTYPE_DETAILS;
        Log.MethodEnter(methodName);
        try {
            let measurementTypeDetails = await Entity.MeasurementType.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!measurementTypeDetails) {
                return ResponseHandler.forbidden(methodName, 'Measurement Type not found ');
            }
            return ResponseHandler.success(methodName, measurementTypeDetails)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    
    async saveMeasurementTypeServices(data) {
        const methodName = Methods.SAVE_MEASUREMENTTYPE;
        Log.MethodEnter(methodName);
        try {
            let findMeasurementtype = await Entity.MeasurementType.findOne({
                
            })
                let saveMeasurementType = await Entity.MeasurementType.create(Object.assign({}, data))

                return ResponseHandler.success(methodName,saveMeasurementType)
            }
         catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async updateMeasurementTypeServices(data) {
        const methodName = Methods.UPDATE_MEASUREMENTTYPE;
        Log.MethodEnter(methodName);
        try {
            let findId = await Entity.MeasurementType.findOne({
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

    async deleteMeasurementTypeServices(data) {
        const methodName = Methods.DELETE_MEASUREMENTTYPE;
        Log.MethodEnter(methodName);
        try {
            let del = await Entity.MeasurementType.findOne({
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