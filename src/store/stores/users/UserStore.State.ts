import { UserAccount } from "../../../entities/user/UserAccount";

export interface UserState {
    me: UserAccount | null;
    loadingMe: boolean;
    users: UserAccount[];
}

export const UserDefaultState: UserState = {
    me: null,
    loadingMe: true,
    users: [],
}