import {getCustomRepository} from "typeorm";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";
import AppError from "../../../shared/errors/AppError";
import AppSuccess from "../../../shared/success/AppSuccess";

class DeleteCommentPostService {

    public async execute(id: number, userId: number): Promise<Object> {

        const commentRepository = getCustomRepository(CommentsRepository);
        const comment = await commentRepository.findByIdAndUserId(id, userId);

        if (!comment) {
            throw new AppError('Comment not found.');
        }

        await commentRepository.remove(comment);

        return new AppSuccess('Comment deleted successfully.', 204);
    }
}

export default DeleteCommentPostService;