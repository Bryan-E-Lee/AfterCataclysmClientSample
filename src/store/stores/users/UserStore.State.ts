import { UserAccount } from "../../../entities/user/UserAccount";

export interface UserState {
    me: UserAccount | null;
    adventureConnectionId: string | null;
    loadingMe: boolean;
    users: UserAccount[];
}

export const UserDefaultState: UserState = {
    me: null,
    adventureConnectionId: null,
    loadingMe: true,
    users: [],
}