
class ResponseObject {
    constructor() {
        this.hasLog = false
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            this.hasLog = true
        }
    }

    success(method, data = '', message = 'success') {
        if (this.hasLog) {
            console.info(`Service | Success | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = 0;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = data;
        return response;
    }

    userNotFound(method, data = '', message = 'success') {
        if (this.hasLog) {
            console.info(`Service | Success | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = 3;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = data;
        return response;
    }

    roleNotFound(method, data = '', message = 'success') {
        if (this.hasLog) {
            console.info(`Service | Success | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = 5;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = data;
        return response;
    }

    otpInvalid(method, data = '', message = 'success') {
        if (this.hasLog) {
            console.info(`Service | Success | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = 4;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = data;
        return response;
    }

    created(method, data = '', message = 'success') {
        if (this.hasLog) {
            console.info(`Service | Success | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = 10;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = data;
        return response;
    }

    invalid(method, message = 'Invalid parameters') {
        if (this.hasLog) {
            console.info(`Service | Invalid | ${method} | ${message}`)
        }
        const response = new Object();
        response['response_code'] = 1;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = '';
        return response;
    }

    failure(method, error, message = 'Sorry something went wrong') {
        if (this.hasLog) {
            console.info(`Service | Failed | ${method} | `, error)
        }

        const response = new Object();
        response['response_code'] = 2;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = '';
        return response;
    }

    error(method, message) {
        if (this.hasLog) {
            console.info(`Service | Error | ${method} | `, message)
        }

        const response = new Object();
        response['response_code'] = 2;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = '';
        return response;
    }

    unauthorized(method, message = 'unauthorized') {
        if (this.hasLog) {
            console.info(`Service | unauthorized | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = -1;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = '';
        return response;
    }

    forbidden(method, message = 'forbidden') {
        if (this.hasLog) {
            console.info(`Service | forbidden | ${method} | `)
        }
        const response = new Object();
        response['response_code'] = -2;
        response['response_message'] = message;
        response['response_method'] = method;
        response['response'] = {};
        return response;
    }
}

export default new ResponseObject();