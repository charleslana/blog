import {Request, Response} from "express";
import AppError from "../../../shared/errors/AppError";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import {classToPlain} from "class-transformer";

class AvatarController {

    public async update(request: Request, response: Response): Promise<Response> {

        if (!request.file) {
            throw new AppError('Invalid field, required avatar.');
        }

        const updateAvatar = new UpdateUserAvatarService();

        const user = await updateAvatar.execute({
            id: request.user.id,
            avatarFilename: request.file.filename
        });

        return response.json(classToPlain(user));
    }
}

export default AvatarController;