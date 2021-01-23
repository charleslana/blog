import {Request, Response} from "express";
import UpdateUserBannedService from "../services/UpdateUserBannedService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";

class BannedController {

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, banned} = request.body;
        const updateUserBanned = new UpdateUserBannedService();

        const user = await updateUserBanned.execute({
            id,
            banned
        }) as AppSuccessInterface;

        return response.status(user.statusCode).json(user);
    }
}

export default BannedController;