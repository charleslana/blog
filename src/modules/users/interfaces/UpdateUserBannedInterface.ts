import UsersBannedEnum from "../enumerations/UsersBannedEnum";

export default interface UpdateUserBannedInterface {
    id: number;
    banned: UsersBannedEnum;
}