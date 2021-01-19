import {Request, Response} from "express";
import UpdateUserRoleService from "../services/UpdateUserRoleService";

class RoleController {

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, role} = request.body;
        const updateUserRole = new UpdateUserRoleService();

        const user = await updateUserRole.execute({
            id,
            role
        });

        return response.json(user);
    }
}

export default RoleController;