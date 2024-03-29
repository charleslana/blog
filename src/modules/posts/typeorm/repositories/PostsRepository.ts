import {EntityRepository, Repository} from "typeorm";
import Post from "../entities/Post";
import PaginatePostInterface from "../../interfaces/PaginatePostInterface";

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {

    public async findAllPerPage(): Promise<PaginatePostInterface> {

        return await this.createQueryBuilder('posts')
            .select(['posts', 'user.name', 'user.avatar'])
            .leftJoin('posts.user', 'user')
            .orderBy('posts.created_at', 'DESC')
            .paginate() as PaginatePostInterface;
    }

    public async findById(id: number): Promise<Post | undefined> {

        return await this.createQueryBuilder('posts')
            .select(['posts', 'user.name', 'user.avatar'])
            .leftJoin('posts.user', 'user')
            .where({id})
            .getOne()
    }

    public async findByIdWithComments(id: number): Promise<Post | undefined> {

        return await this.createQueryBuilder('posts')
            .select(['posts', 'user.name', 'user.avatar', 'comments_post', 'user_comment.name',
                'user_comment.avatar'
            ])
            .leftJoin('posts.user', 'user')
            .leftJoin('posts.comments_post', 'comments_post')
            .leftJoin('comments_post.user', 'user_comment')
            .where({id})
            .getOne()
    }

    public async filterPerPage(text: string): Promise<PaginatePostInterface> {

        return await this.createQueryBuilder('posts')
            .select(['posts', 'user.name', 'user.avatar'])
            .leftJoin('posts.user', 'user')
            .where("posts.title like :text", {
                text: `%${text}%`
            })
            .orderBy('posts.created_at', 'DESC')
            .paginate() as PaginatePostInterface;
    }
}

export default PostsRepository;