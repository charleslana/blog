import {NextFunction, Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../../../modules/users/typeorm/repositories/UsersRepository";
import AppError from "../../errors/AppError";
import UsersRoleEnum from "../../../modules/users/enumerations/UsersRoleEnum";

export default async function restrictedAccessForRoleModOrAdmin(request: Request, response: Response, next: NextFunction)
    : Promise<void> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(request.user.id);

    if (!user) {
        throw new AppError('User not found.');
    }

    if (user.role == UsersRoleEnum.USER) {
        throw new AppError('Unauthorized access.', 401);
    }

    return next();
}