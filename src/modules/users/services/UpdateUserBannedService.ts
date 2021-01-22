import User from "../typeorm/entities/User";
import UpdateUserBannedInterface from "../interfaces/UpdateUserBannedInterface";
import AppError from "../../../shared/errors/AppError";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class UpdateUserBannedService {

    public async execute({id, banned}: UpdateUserBannedInterface): Promise<User> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        user.banned = banned;

        await userRepository.save(user);

        return user;
    }

}

export default UpdateUserBannedService;