import User from "../typeorm/entities/User";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";

class ShowUserService {

    public async execute(id: number): Promise<User | undefined> {

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne(id);

        if(!user) {
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowUserService;