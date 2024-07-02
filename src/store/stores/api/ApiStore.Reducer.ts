import { Action, Reducer } from "redux";
import { ApiAction } from "./ApiStore.Actions";
import { ApiDefaultState, ApiState } from "./ApiStore.State";

export const ApiReducer: Reducer<ApiState> = (state: ApiState | undefined, incomingAction: Action) => {
    if (state == undefined) {
        return ApiDefaultState;
    }
    const action = incomingAction as ApiAction;
    switch (action.type) {
        case 'API_SET_HUB_ADVENTURE':
            return { ...state, adventureHub: action.hub };
    }
    return state;
}