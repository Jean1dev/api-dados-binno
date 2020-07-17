import {NextFunction, Request, Response} from "express";
import ensureAuthenticated from "./implementations/ensureAuthenticated";

export default function (request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization
    const userAccess = request.headers.user_access
    const isMobileClient = request.headers.mobile

    ensureAuthenticated(auth, Number(userAccess), Boolean(isMobileClient))
    next()
}