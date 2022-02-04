'use strict';

import { MediaType } from '../../config/Constants';
import Handler from './Handler';
import { saveProductValidation, updateRolesValidation, deleteValidation } from '../../validation/Validation'
import requestValidator from '../../middlewares/requestValidator'
import Methods from "./Methods";
import { authenticateUser } from '../../oauth/authenticate';

export default [
    {
        path: '/list',
        type: MediaType.GET,
        method: Handler.getProductList,
        options: {}
    },
    {
        path: '/details',
        type: MediaType.GET,
        method: Handler.getProductDetails,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [authenticateUser(), requestValidator(Methods.SAVE_ROLES, saveProductValidation)],
        method: Handler.saveProduct,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.UPDATE_ROLES, updateRolesValidation)],
        method: Handler.updateProduct,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        // middleware: [requestValidator(Methods.DELETE_ROLES, deleteValidation)],
        method: Handler.deleteProduct,
        options: {}
    }
]