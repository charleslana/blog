import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import AppSuccess from "../../../shared/success/AppSuccess";

class DeleteUserService {

    public async execute(id: number): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        await userRepository.remove(user);

        return new AppSuccess('User deleted successfully.', 204);
    }
}

export default DeleteUserService;