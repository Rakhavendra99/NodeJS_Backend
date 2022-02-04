
const Entity = require("../entity")

const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } = require("../otp-auth/error")
import ResponseHandler from '../util/Response'
import HttpResponse from '../util/HttpResponse';

const { verifyJwtToken } = require("../util/token")




module.exports = async (req, res, next) => {
    try {
        // check for auth header from client 
        const header = req.headers.authorization

        if (!header) {
            return HttpResponse(res, ResponseHandler.error("Check Auth", "AUTH_HEADER_MISSING_ERR"));
        }

        // verify  auth token
        const token = header.split("Bearer ")[1]

        if (!token) {
            return HttpResponse(res, ResponseHandler.error("Check Auth", "AUTH_TOKEN_MISSING_ERR"));
        }

        const authContext = verifyJwtToken(token, res, req, next)
        if (authContext && !authContext.userId) {
            return HttpResponse(res, ResponseHandler.error("Check Auth", "JWT_DECODE_ERR"));
        }

        const user = await Entity.Users.findOne({
            where: {
                id: authContext && authContext.userId
            },
            include: [{ model: Entity.Stores },
            { model: Entity.Roles }]
        })

        if (!user) {
            return HttpResponse(res, ResponseHandler.error("Check Auth", "USER_NOT_FOUND_ERR"));
        }

        res.locals.user = user

        next()
    } catch (err) {
        next(err)
    }
}
