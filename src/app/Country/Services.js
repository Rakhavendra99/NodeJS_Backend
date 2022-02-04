import Entity from '../../entity';
import ResponseHandler from '../../util/Response';
import Methods from "./Methods";
import { ControllerLog as Log, Common as CommonLog } from '../../util/Log';


class RoutesService {
    async getCountryListServices() {
        const methodName = Methods.GET_COUNTRY_LIST;
        Log.MethodEnter(methodName);
        try {
            let countryList = await Entity.Country.findAll({

            })
            return ResponseHandler.success(methodName, countryList)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async getCountryDetailsServices(data) {
        const methodName = Methods.GET_COUNTRY_DETAILS;
        Log.MethodEnter(methodName);
        try {
            let countryDetails = await Entity.Country.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!countryDetails) {
                return ResponseHandler.forbidden(methodName, 'Country Id not found ');
            }
            return ResponseHandler.success(methodName, countryDetails)
        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }


    async saveCountryServices(data) {
        const methodName = Methods.SAVE_COUNTRY;
        Log.MethodEnter(methodName);
        try {
            let findCountry = await Entity.Country.findOne({
                where: {
                    countryCode: data.countryCode
                }
            })
            const countryDetails = findCountry && findCountry.toJSON()
            if (countryDetails) {
                return ResponseHandler.forbidden(methodName, "Country code already taken")
            } else {
                data.isActive = 1
                let saveCountry = await Entity.Country.create(Object.assign({}, data))
                return ResponseHandler.success(methodName, saveCountry)
            }

        }
        catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }

    async updateCountryServices(data) {
        const methodName = Methods.UPDATE_COUNTRY;
        Log.MethodEnter(methodName);
        try {
            let findId = await Entity.Country.findOne({
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

    async deleteCountryServices(data) {
        const methodName = Methods.DELETE_COUNTRY;
        Log.MethodEnter(methodName);
        try {
            let del = await Entity.Country.findOne({
                where: { id: data.id }
            })
            if (!del) {
                return ResponseHandler.forbidden(methodName, 'Id is not found, So cannot delete the value')
            }
            data.isActive = 0
            del.update(Object.assign({}, data))
            return ResponseHandler.success(methodName, del)

        } catch (error) {
            CommonLog.ERROR(error);
            return ResponseHandler.failure(methodName, 'Sorry something went wrong ');
        }
    }



}




export default new RoutesService();