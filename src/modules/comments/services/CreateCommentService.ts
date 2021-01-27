import CreateCommentInterface from "../interfaces/CreateCommentInterface";
import {getCustomRepository} from "typeorm";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";
import UsersRepository from "../../users/typeorm/repositories/UsersRepository";
import UsersBannedEnum from "../../users/enumerations/UsersBannedEnum";
import AppError from "../../../shared/errors/AppError";
import PostsRepository from "../../posts/typeorm/repositories/PostsRepository";
import AppSuccess from "../../../shared/success/AppSuccess";

class CreateCommentService {

    public async execute({id, message, postId}: CreateCommentInterface): Promise<Object> {

        const commentRepository = getCustomRepository(CommentsRepository);
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if (user?.banned == UsersBannedEnum.YES) {
            throw new AppError("You are banned.");
        }

        const postRepository = getCustomRepository(PostsRepository);
        const post = await postRepository.findOne(postId);

        if (!post) {
            throw new AppError('Post not found.');
        }

        const comment = commentRepository.create({
            message,
            user,
            post
        });

        await commentRepository.save(comment);

        return new AppSuccess('Comment successfully posted.', 201);
    }

}

export default CreateCommentService;