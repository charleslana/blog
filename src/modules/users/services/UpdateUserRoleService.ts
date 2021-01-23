import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import UpdateUserRoleInterface from "../interfaces/UpdateUserRoleInterface";
import AppSuccess from "../../../shared/success/AppSuccess";

class UpdateUserRoleService {

    public async execute({id, role}: UpdateUserRoleInterface): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.role = role;

        await userRepository.save(user);

        return new AppSuccess("The user's role status has been successfully changed.");

    }
}

export default UpdateUserRoleService;