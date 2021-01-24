import {getCustomRepository} from 'typeorm';
import CreateUserInterface from "../interfaces/CreateUserInterface";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {hash} from "bcryptjs";
import AppSuccess from "../../../shared/success/AppSuccess";

class CreateUserService {

    public async execute({name, email, password}: CreateUserInterface): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email address already used.')
        }

        const hashedPassword = await hash(password, 10);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return new AppSuccess('User successfully registered.', 201);
    }
}

export default CreateUserService;