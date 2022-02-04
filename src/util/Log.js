let hasLog = false
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    hasLog = true
}

const INFO = (...message) => { hasLog && console.info(new Date(), ' ', ...message) };
const ERROR = (...message) => { hasLog && console.error(new Date(), ' ', ...message) };
const WARNING = (...message) => { hasLog && console.warn(new Date(), ' ', ...message) };
const LOG = (...message) => { hasLog && console.log(new Date(), ' ', ...message) };

const ControllerEnter = (methodName) => {
    hasLog && console.info(new Date(), ' Controller -> Enter -> ', methodName);
}

const ControllerExit = (methodName) => {
    hasLog && console.info(new Date(), ' Controller -> Exit -> ', methodName);
}

const ControllerError = (methodName, message) => {
    hasLog && console.error(new Date(), ' Controller -> Error -> ', methodName, ' -> ', message);
}

const ControllerWarning = (methodName, message) => {
    hasLog && console.warn(new Date(), ' Controller -> Warning -> ', methodName, ' -> ', message);
}

const ServiceEnter = (methodName) => {
    hasLog && console.info(new Date(), ' Service -> Enter -> ', methodName);
}

const ServiceExit = (methodName) => {
    hasLog && console.info(new Date(), ' Service -> Exit -> ', methodName);
}

const ServiceError = (methodName, message) => {
    hasLog && console.error(new Date(), ' Service -> Error -> ', methodName, ' -> ', message);
}

const ServiceWarning = (methodName, message) => {
    hasLog && console.warn(new Date(), ' Service -> Warning -> ', methodName, ' -> ', message);
}

export const ControllerLog = {
    MethodEnter: ControllerEnter,
    MethodExit: ControllerExit,
    MethodError: ControllerError,
    MethodWarning: ControllerWarning,
}

export const ServiceLog = {
    MethodEnter: ServiceEnter,
    MethodExit: ServiceExit,
    MethodError: ServiceError,
    MethodWarning: ServiceWarning,
}

export const Common = {
    INFO,
    ERROR,
    WARNING,
    LOG,
};



