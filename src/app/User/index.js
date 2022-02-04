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
        method: Handler.getUserList,
        options: {}
    },
    {
        path: '/details',
        type: MediaType.GET,
        method: Handler.getUserDetails,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.SAVE_ROLES, saveRolesValidation)],
        method: Handler.saveUser,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.UPDATE_ROLES, updateRolesValidation)],
        method: Handler.updateUser,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.DELETE_ROLES, deleteValidation)],
        method: Handler.deleteUser,
        options: {}
    }
]