import {getCustomRepository} from "typeorm";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";
import AppError from "../../../shared/errors/AppError";
import AppSuccess from "../../../shared/success/AppSuccess";
import UpdateCommentPostInterface from "../interfaces/UpdateCommentPostInterface";

class UpdateCommentPostService {

    public async execute({id, userId, message}: UpdateCommentPostInterface): Promise<Object> {

        const commentRepository = getCustomRepository(CommentsRepository);
        const comment = await commentRepository.findByIdAndUserId(id, userId);

        if (!comment) {
            throw new AppError('Comment not found.');
        }

        comment.message = message;

        await commentRepository.save(comment);

        return new AppSuccess('Comment updated successfully.');
    }
}

export default UpdateCommentPostService;