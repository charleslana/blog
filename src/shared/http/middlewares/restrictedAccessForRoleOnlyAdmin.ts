import {NextFunction, Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../../../modules/users/typeorm/repositories/UsersRepository";
import UsersRoleEnum from "../../../modules/users/enumerations/UsersRoleEnum";
import AppError from "../../errors/AppError";

export default async function restrictedAccessForRoleOnlyAdmin(request: Request, response: Response, next: NextFunction)
    : Promise<void> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(request.user.id);

    if (!user) {
        throw new AppError('User not found.');
    }

    if (user.role != UsersRoleEnum.ADMIN) {
        throw new AppError('Unauthorized access.', 401);
    }

    return next();
}