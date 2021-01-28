import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import AppSuccess from "../../../shared/success/AppSuccess";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";

class DeleteCommentService {

    public async execute(id: number): Promise<Object> {

        const commentRepository = getCustomRepository(CommentsRepository);
        const comment = await commentRepository.findOne(id);

        if (!comment) {
            throw new AppError('Comment not found.');
        }

        await commentRepository.remove(comment);

        return new AppSuccess('Comment deleted successfully.', 204);
    }
}

export default DeleteCommentService;