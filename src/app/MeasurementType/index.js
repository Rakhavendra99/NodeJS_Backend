'use strict';

import { MediaType } from '../../config/Constants';
import Handler from './Handler';
// import { saveRolesValidation, updateRolesValidation, deleteValidation } from '../../validation/Validation'
// import requestValidator from '../../middlewares/requestValidator'
import Methods from "./Methods";
export default [
    {
        path: '/list',
        type: MediaType.GET,
        method: Handler.getMeasurementTypeList,
        options: {}
    },
    {
        path: '/details',
        type: MediaType.GET,
        method: Handler.getMeasurementTypeDetails,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.SAVE_ROLES, saveRolesValidation)],
        method: Handler.saveMeasurementType,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.UPDATE_ROLES, updateRolesValidation)],
        method: Handler.updateMeasurementType,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.DELETE_ROLES, deleteValidation)],
        method: Handler.deleteMeasurementType,
        options: {}
    }
]