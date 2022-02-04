import config from "../config";
import axios from 'axios';

export const getRequestParser = (req) => req.query;

export const postRequestParser = (req) => req.body;

export const postRequestHeader = (req) => req.headers;

export const getUserIdByToken = (req) => req.user.id;

export const getPremisesIdByToken = (req) => req.user.UserProfile.premisesId;

export const getRoleIdByToken = (req) => req.user.roleId;

export const encryptPass = (password) => {
    var result = require("crypto").createHash("sha256").update(password, "utf8").digest("hex");
    return result;
}


export const pushNotificationCustomerKey = {
    APP_ID: 'dd13b27b-845c-4f40-b99a-c84f179589db',
    API_KEY: 'MWU4N2NlM2YtMWZiZC00ZGM3LWJiN2EtNzM4OWQ3NTg2MjEy'
}
export const pushNotificationAladdinKey = {
    APP_ID: 'fb25ba45-fa43-4db5-9d87-c56bbee9b842',
    API_KEY: 'NzYxZTU1MzctODc3Ni00ZjY4LThlZjItYTk1MTUzOTljN2Jl'
}

export const otpMessage = (countryCode, mobileNo, message) => {

    const baseUrl = `${config.oneWaySmsUrl}?apiusername=API1PPAAVNFNM&apipassword=API1PPAAVNFNM1PPAA&mobileno=${countryCode + mobileNo}&senderid=MASTERMYNA&languagetype=1&message=${message}`;
    axios.get(baseUrl).then(resp => {
        console.log('Resp OTP: ', resp);
        return resp.data
    }).catch((error) => {
        console.log('Error OTP: ', error);
        throw error
    })

}
