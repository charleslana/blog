import User from "../typeorm/entities/User";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUserService {

    public async execute(): Promise<User[]> {

        const userRepository = getCustomRepository(UsersRepository);

        return await userRepository.find();
    }
}

export default ListUserService;