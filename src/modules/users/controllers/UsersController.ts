import {Request, Response} from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import ShowUserService from "../services/ShowUserService";
import {classToPlain} from "class-transformer";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";

class UsersController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {name, email, password} = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        }) as AppSuccessInterface;

        return response.status(user.statusCode).json(user);
    }

    public async list(request: Request, response: Response): Promise<Response> {

        const listUsers = new ListUserService();
        const users = await listUsers.execute();

        return response.json(classToPlain(users));
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const showUser = new ShowUserService();
        const user = await showUser.execute(parseInt(id));

        return response.json(classToPlain(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, name, email} = request.body;
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id,
            name,
            email
        });

        return response.json(classToPlain(user));
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const deleteUser = new DeleteUserService();
        const user = await deleteUser.execute(parseInt(id)) as AppSuccessInterface;

        return response.json(user);
    }
}

export default UsersController;