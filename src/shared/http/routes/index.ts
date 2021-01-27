import {Router} from 'express';
import usersRouter from "../../../modules/users/routes/usersRouter";
import sessionsRouter from "../../../modules/users/routes/sessionsRouter";
import passwordRouter from "../../../modules/users/routes/passwordRouter";
import avatarRouter from "../../../modules/users/routes/avatarRouter";
import roleRouter from "../../../modules/users/routes/roleRouter";
import bannedRouter from "../../../modules/users/routes/bannedRouter";
import userProfileRouter from "../../../modules/users/routes/userProfileRouter";
import postsRouter from "../../../modules/posts/routes/postsRouter";
import commentsRouter from "../../../modules/comments/routes/commentsRouter";

const routes = Router();

routes.use('/users/details', usersRouter);

routes.use('/users/session', sessionsRouter);

routes.use('/users/profile', userProfileRouter);

routes.use('/users/password', passwordRouter);

routes.use('/users/avatar', avatarRouter);

routes.use('/users/role', roleRouter);

routes.use('/users/banned', bannedRouter);

routes.use('/posts', postsRouter);

routes.use('/comments', commentsRouter);

export default routes;