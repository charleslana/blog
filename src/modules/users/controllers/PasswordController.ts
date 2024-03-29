import {Request, Response} from "express";
import UpdateUserPasswordService from "../services/UpdateUserPasswordService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";

class PasswordController {

    public async update(request: Request, response: Response): Promise<Response> {

        const {currentPassword, newPassword} = request.body;
        const updateUserPassword = new UpdateUserPasswordService();

        const user = await updateUserPassword.execute({
            id: request.user.id,
            currentPassword,
            newPassword
        }) as AppSuccessInterface;

        return response.json(user);
    }

}

export default PasswordController;