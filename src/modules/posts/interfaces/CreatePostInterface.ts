import PostsCommentsEnum from "../enumerations/PostsCommentsEnum";
import PostsCategoryEnum from "../enumerations/PostsCategoryEnum";

export default interface CreatePostInterface {
    id: number;
    title: string;
    description: string;
    category: PostsCategoryEnum;
    comments: PostsCommentsEnum;
}