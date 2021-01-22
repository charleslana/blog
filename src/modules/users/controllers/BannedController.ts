import {Request, Response} from "express";
import UpdateUserBannedService from "../services/UpdateUserBannedService";

class BannedController {

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, banned} = request.body;
        const updateUserBanned = new UpdateUserBannedService();

        const user = await updateUserBanned.execute({
            id,
            banned
        });

        return response.json(user);
    }
}

export default BannedController;