import { Action, Reducer } from "redux";
import { AdminApiDefaultState, AdminApiState } from "./Admin.ApiStore.State";

export const AdminApiReducer: Reducer<AdminApiState> = (state: AdminApiState | undefined, incomingAction: Action) => {
    if (state == undefined) {
        return AdminApiDefaultState;
    }

    /* Hub subscriptions go here */
    return AdminApiDefaultState;
}