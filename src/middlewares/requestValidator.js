import ResponseHandler from '../util/Response';
import { Common } from '../util/Log';
import HttpResponse from '../util/HttpResponse';
const requestValidator = (methodName, schema) => {
  return (req, res, next) => {
    console.log(req.body)
    const { error } = schema.unknown(true).validate(req.body)
    const valid = error == undefined;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      Common.ERROR(message);
      return HttpResponse(res, ResponseHandler.invalid(methodName, message));
    }
  }
}
module.exports = requestValidator