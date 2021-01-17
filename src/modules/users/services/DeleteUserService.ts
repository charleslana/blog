import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";

class DeleteUserService {

    public async execute(id: number): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if(!user) {
            throw new AppError('User not found.');
        }

        await userRepository.remove(user);

        return {
            statusCode: 204,
            status: 'success',
            message: 'User deleted successfully'
        }
    }
}
export default DeleteUserService;