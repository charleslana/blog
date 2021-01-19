import UsersEnum from "../typeorm/entities/enumerates/UsersEnum";

export default interface UpdateUserRoleInterface {
    id: number;
    role: UsersEnum
}