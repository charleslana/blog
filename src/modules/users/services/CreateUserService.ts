import {getCustomRepository} from 'typeorm';
import User from "../typeorm/entities/User";
import CreateUserInterface from "../interfaces/CreateUserInterface";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {hash} from "bcryptjs";

class CreateUserService {

    public async execute({name, email, password}: CreateUserInterface): Promise<User> {

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

        return await userRepository.save(user);
    }
}

export default CreateUserService;