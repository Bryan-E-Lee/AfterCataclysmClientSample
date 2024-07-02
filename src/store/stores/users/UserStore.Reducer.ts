import { Action, Reducer } from "redux";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { UserAction } from "./UserStore.Actions";
import { UserDefaultState, UserState } from "./UserStore.State";

export const UserReducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action) => {
    if (state == undefined) {
        return UserDefaultState;
    }
    const action = incomingAction as UserAction;
    switch (action.type) {
        case 'USER_SET':
            return { ...state, me: action.userAccount };
        case 'USERS_GET':
            const users = new SortedSet(state.users);
            const toAdd = action.users.filter(u => u.id != state.me?.id);
            users.addOrUpdateRange(...toAdd);
            return { ...state, users: [...users], loadingMe: false }
        case 'USER_CLEAR':
            return { ...state, me: null, loadingMe: false };
        default:
            return state;
    }
}