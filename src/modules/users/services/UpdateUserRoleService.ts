import User from "../typeorm/entities/User";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import UpdateUserRoleInterface from "../interfaces/UpdateUserRoleInterface";
import UsersRoleEnum from "../enumerates/UsersRoleEnum";

class UpdateUserRoleService {

    public async execute({id, role}: UpdateUserRoleInterface): Promise<User> {

        if (!(role in UsersRoleEnum)) {
            throw new AppError('Role not found.');
        }

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.role = role;

        await userRepository.save(user);

        return user;

    }
}

export default UpdateUserRoleService;