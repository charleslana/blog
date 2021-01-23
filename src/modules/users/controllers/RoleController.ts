import {Request, Response} from "express";
import UpdateUserRoleService from "../services/UpdateUserRoleService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";

class RoleController {

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, role} = request.body;
        const updateUserRole = new UpdateUserRoleService();

        const user = await updateUserRole.execute({
            id,
            role
        }) as AppSuccessInterface;

        return response.status(user.statusCode).json(user);
    }
}

export default RoleController;