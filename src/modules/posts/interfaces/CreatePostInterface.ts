import PostsCommentsEnum from "../enumerations/PostsCommentsEnum";

export default interface CreatePostInterface {
    id: number;
    title: string;
    description: string;
    comments: PostsCommentsEnum;
}