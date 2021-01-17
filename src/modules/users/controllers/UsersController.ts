import {Request, Response} from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import ShowUserService from "../services/ShowUserService";
import {classToPlain} from "class-transformer";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

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

        const {id, name, email} = request.body;
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id,
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

}

export default UsersController;