import {Router} from 'express';
import usersRouter from "../../../modules/users/routes/usersRouter";
import sessionsRouter from "../../../modules/users/routes/sessionsRouter";
import passwordRouter from "../../../modules/users/routes/passwordRouter";
import avatarRouter from "../../../modules/users/routes/avatarRouter";

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/session', sessionsRouter);

routes.use('/users', passwordRouter);

routes.use('/users', avatarRouter);

export default routes;