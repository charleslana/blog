import PostsCommentsEnum from "../enumerations/PostsCommentsEnum";
import PostsVisibilityEnum from "../enumerations/PostsVisibilityEnum";

export default interface UpdatePostInterface {
    id: number;
    title: string;
    description: string;
    comments: PostsCommentsEnum;
    visibility: PostsVisibilityEnum;
}