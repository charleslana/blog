import {Router} from 'express';
import usersRouter from "../../../modules/users/routes/usersRouter";
import sessionsRouter from "../../../modules/users/routes/sessionsRouter";
import passwordRouter from "../../../modules/users/routes/passwordRouter";
import avatarRouter from "../../../modules/users/routes/avatarRouter";
import roleRouter from "../../../modules/users/routes/roleRouter";
import bannedRouter from "../../../modules/users/routes/bannedRouter";

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/session', sessionsRouter);

routes.use('/users', passwordRouter);

routes.use('/users', avatarRouter);

routes.use('/users', roleRouter);

routes.use('/users', bannedRouter);

export default routes;