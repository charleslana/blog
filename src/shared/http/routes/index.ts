import {Router} from 'express';
import usersRouter from "../../../modules/users/routes/usersRouter";

const routes = Router();

routes.use('/users', usersRouter)

export default routes;