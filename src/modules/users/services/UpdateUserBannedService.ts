import UpdateUserBannedInterface from "../interfaces/UpdateUserBannedInterface";
import AppError from "../../../shared/errors/AppError";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppSuccess from "../../../shared/success/AppSuccess";

class UpdateUserBannedService {

    public async execute({id, banned}: UpdateUserBannedInterface): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.banned = banned;

        await userRepository.save(user);

        return new AppSuccess("The user's banned status has been successfully changed.");
    }

}

export default UpdateUserBannedService;