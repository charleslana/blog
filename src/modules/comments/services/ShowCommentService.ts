import Comment from "../typeorm/entities/Comment";
import {getCustomRepository} from "typeorm";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";
import AppError from "../../../shared/errors/AppError";

class ShowCommentService {

    public async execute(id: number): Promise<Comment | undefined> {

        const commentRepository = getCustomRepository(CommentsRepository);
        const comment = await commentRepository.findById(id);

        if (!comment) {
            throw new AppError('Comment not found.');
        }

        return comment;
    }
}

export default ShowCommentService;