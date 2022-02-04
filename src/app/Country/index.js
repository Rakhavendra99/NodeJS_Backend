'use strict';

import { MediaType } from '../../config/Constants';
import Handler from './Handler';
import { saveCountryValidation, updateCountryValidation, deleteValidation } from '../../validation/Validation'
import requestValidator from '../../middlewares/requestValidator'
import Methods from "./Methods";
export default [
    {
        path: '/list',
        type: MediaType.GET,
        method: Handler.getCountryList,
        options: {}
    },
    {
        path: '/details',
        type: MediaType.GET,
        method: Handler.getCountryDetails,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [requestValidator(Methods.SAVE_COUNTRY, saveCountryValidation)],
        method: Handler.saveCountry,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [requestValidator(Methods.UPDATE_ROLES, updateCountryValidation)],
        method: Handler.updateCountry,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        middleware: [requestValidator(Methods.DELETE_ROLES, deleteValidation)],
        method: Handler.deleteCountry,
        options: {}
    }
]