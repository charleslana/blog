import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import AppSuccess from "../../../shared/success/AppSuccess";
import UpdateCommentInterface from "../interfaces/UpdateCommentInterface";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";

class UpdateCommentService {

    public async execute({id, message}: UpdateCommentInterface): Promise<Object> {

        const commentRepository = getCustomRepository(CommentsRepository);
        const comment = await commentRepository.findOne(id);

        if (!comment) {
            throw new AppError('Comment not found.');
        }

        comment.message = message;

        await commentRepository.save(comment);

        return new AppSuccess('Comment updated successfully.');
    }
}

export default UpdateCommentService;