import {Request, Response} from "express";
import ShowUserService from "../services/ShowUserService";
import {classToPlain} from "class-transformer";
import UpdateUserService from "../services/UpdateUserService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";

class UserProfileController {

    public async show(request: Request, response: Response): Promise<Response> {

        const showUser = new ShowUserService();
        const user = await showUser.execute(request.user.id);

        return response.json(classToPlain(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const {name, email} = request.body;
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id: request.user.id,
            name,
            email
        }) as AppSuccessInterface;

        return response.status(user.statusCode).json(user);
    }
}

export default UserProfileController;