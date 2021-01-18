import {Router} from "express";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import AvatarController from "../controllers/AvatarController";
import multer from "multer";
import uploadConfig from "../../../config/upload";

const avatarRouter = Router();
const avatarController = new AvatarController();
const upload = multer(uploadConfig);

avatarRouter.patch(
    '/avatar',
    authenticatedUser,
    upload.single('avatar'),
    avatarController.update
);

export default avatarRouter;