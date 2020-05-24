import DefaultAppError from "./DefaultAppError";
import { Request, NextFunction, Response } from "express";

export function errorHandler(error: Error, _: Request, response: Response, next: NextFunction): Response {
    if (error instanceof DefaultAppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}