import {getCustomRepository} from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from '../../../config/upload'
import * as fs from "fs";
import UpdateUserAvatarInterface from "../interfaces/UpdateUserAvatarInterface";

class UpdateUserAvatarService {

    public async execute({id, avatarFilename}: UpdateUserAvatarInterface): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (user.avatar) {

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;