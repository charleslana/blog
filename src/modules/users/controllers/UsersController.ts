import {Request, Response} from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import ShowUserService from "../services/ShowUserService";
import {classToPlain} from "class-transformer";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";
import UpdateUserPasswordService from "../services/UpdateUserPasswordService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import AppError from "../../../shared/errors/AppError";

class UsersController {

    public async createUser(request: Request, response: Response): Promise<Response> {

        const {name, email, password} = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return response.status(201).json(classToPlain(user));
    }

    public async listUsers(request: Request, response: Response): Promise<Response> {

        const listUsers = new ListUserService();
        const users = await listUsers.execute();

        return response.json(classToPlain(users));
    }

    public async showUser(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const showUser = new ShowUserService();
        const user = await showUser.execute(parseInt(id));

        return response.json(classToPlain(user));
    }

    public async updateUser(request: Request, response: Response): Promise<Response> {

        const {name, email} = request.body;
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id: request.user.id,
            name,
            email
        });

        return response.json(classToPlain(user));
    }

    public async deleteUser(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const deleteUser = new DeleteUserService();
        const user = await deleteUser.execute(parseInt(id));

        return response.json(user);
    }

    public async updateUserPassword(request: Request, response: Response): Promise<Response> {

        const {currentPassword, newPassword} = request.body;
        const updateUserPassword = new UpdateUserPasswordService();

        const user = await updateUserPassword.execute({
            id: request.user.id,
            currentPassword,
            newPassword
        });

        return response.json(user);
    }

    public async updateUserAvatar(request: Request, response: Response): Promise<Response> {

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

export default UsersController;