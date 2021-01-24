import {EntityRepository, Repository} from "typeorm";
import Post from "../entities/Post";
import PaginatePostInterface from "../../interfaces/PaginatePostInterface";

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {

    public async findAllPerPage(): Promise<PaginatePostInterface> {

        return await this.createQueryBuilder('posts')
            .select(['posts', 'user.name', 'user.avatar'])
            .innerJoin('posts.user', 'user')
            .paginate() as PaginatePostInterface;
    }
}

export default PostsRepository;