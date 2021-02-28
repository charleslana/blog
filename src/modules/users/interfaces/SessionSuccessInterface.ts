import UsersRoleEnum from "../enumerations/UsersRoleEnum";

export default interface SessionSuccessInterface {
    statusCode: number;
    status: string;
    message: string;
    token: string;
    user: {
        name: string;
        avatar: string;
        role: UsersRoleEnum;
    }
}