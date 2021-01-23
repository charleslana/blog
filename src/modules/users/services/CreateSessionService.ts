import CreateSessionInterface from "../interfaces/CreateSessionInterface";
import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import authConfig from '../../../config/auth';
import AppSuccess from "../../../shared/success/AppSuccess";
import UsersBannedEnum from "../enumerates/UsersBannedEnum";

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

        if (user.banned == UsersBannedEnum.YES) {
            throw new AppError('User is banned.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id.toString(),
            expiresIn: authConfig.jwt.expiresIn
        });

        const {statusCode, status, message} = new AppSuccess('User successfully authenticated', 201);

        return {
            statusCode,
            status,
            message,
            token: token,
        }
    }
}

export default CreateSessionService;