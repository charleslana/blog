import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import UpdateUserInterface from "../interfaces/UpdateUserInterface";
import AppSuccess from "../../../shared/success/AppSuccess";

class UpdateUserService {

    public async execute({id, name, email}: UpdateUserInterface): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const emailExists = await userRepository.findByEmail(email);

        if (emailExists && email != user.email) {
            throw new AppError('There is already one email with this name.');
        }

        user.name = name;
        user.email = email;

        await userRepository.save(user);

        return new AppSuccess("Changed profile successfully.");

    }
}

export default UpdateUserService;