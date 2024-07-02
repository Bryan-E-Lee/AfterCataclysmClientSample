import { DefaultSiteState, SiteState } from "./SiteStore.State";
import { SiteAction } from "./SiteStore.Actions";
import { Action, Reducer } from "redux";

export const SiteReducer: Reducer<SiteState> = (state: SiteState | undefined, incomingAction: Action) => {
    if (state == undefined) {
        return DefaultSiteState;
    }
    const action = incomingAction as SiteAction;
    switch (action.type) {
        case 'SITE_SET_LOADING':
            return { ...state, loading: action.loading };
        default:
            return state;
    }
}