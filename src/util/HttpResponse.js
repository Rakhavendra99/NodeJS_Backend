import HTTPCodes from '../config/HTTPCodes';
const ResponseHandler = (httpResponse, responseObject) => {
    if (responseObject.response_code === 1) {
        httpResponse.status(HTTPCodes.MISSING);
    } else if (responseObject.response_code === 2) {
        httpResponse.status(HTTPCodes.INTERNAL_SERVER_ERROR);
    } else if (responseObject.response_code === 10) {
        httpResponse.status(HTTPCodes.CREATED);
    } else if (responseObject.response_code === -1) {
        httpResponse.status(HTTPCodes.UNAUTHORIZED);
    } else if (responseObject.response_code === -2) {
        httpResponse.status(HTTPCodes.SUCCESS);
    } else {
        httpResponse.status(HTTPCodes.SUCCESS);
    }
    httpResponse.send(responseObject);
}

export default ResponseHandler;