import User from "../typeorm/entities/User";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import PaginateUserInterface from "../interfaces/PaginateUserInterface";

class ListUserService {

    public async execute(): Promise<PaginateUserInterface> {

        const userRepository = getCustomRepository(UsersRepository);

        return await userRepository.createQueryBuilder().paginate() as PaginateUserInterface;
    }
}

export default ListUserService;