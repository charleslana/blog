import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import UpdateUserPasswordInterface from "../interfaces/UpdateUserPasswordInterface";
import {compare, hash} from "bcryptjs";

class UpdateUserPasswordService {

    public async execute({id, currentPassword, newPassword}: UpdateUserPasswordInterface): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const checkCurrentPassword = await compare(currentPassword, user.password);

        if (!checkCurrentPassword) {
            throw new AppError('Current password does not match.');
        }

        user.password = await hash(newPassword, 10);

        await userRepository.save(user);

        return {
            statusCode: 200,
            status: 'success',
            message: 'Password changed successfully.'
        }

    }
}

export default UpdateUserPasswordService;