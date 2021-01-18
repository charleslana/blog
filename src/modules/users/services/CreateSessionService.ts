import CreateSessionInterface from "../interfaces/CreateSessionInterface";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import authConfig from '../../../config/auth';

class CreateSessionService {

    public async execute({email, password}: CreateSessionInterface): Promise<Object> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Invalid credentials.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Invalid credentials.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id.toString(),
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            statusCode: 201,
            status: 'success',
            message: 'User successfully authenticated.',
            token: token,
        }
    }
}

export default CreateSessionService;