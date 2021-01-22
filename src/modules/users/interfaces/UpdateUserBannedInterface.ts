import UsersBannedEnum from "../enumerates/UsersBannedEnum";

export default interface UpdateUserBannedInterface {
    id: number;
    banned: UsersBannedEnum;
}