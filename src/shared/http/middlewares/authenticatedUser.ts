import {NextFunction, Request, Response} from "express";
import AppError from "../../errors/AppError";
import {verify} from "jsonwebtoken";
import authConfig from '../../../config/auth';

export default function authenticatedUser(request: Request, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Authentication token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const {sub} = decodedToken as AuthenticatedUserInterface;

        request.user = {
            id: sub
        }

        return next();
    } catch {
        throw new AppError('Invalid token.');
    }
}