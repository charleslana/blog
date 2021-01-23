import User from "../typeorm/entities/User";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import PaginateUserInterface from "../interfaces/PaginateUserInterface";

class ListUserService {

    public async execute(): Promise<PaginateUserInterface> {

        const userRepository = getCustomRepository(UsersRepository);

        const users = await userRepository.createQueryBuilder().paginate();

        return users as PaginateUserInterface;
    }
}

export default ListUserService;