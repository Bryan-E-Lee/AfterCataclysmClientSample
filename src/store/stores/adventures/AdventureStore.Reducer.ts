import { Action, Reducer } from "redux";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { AdventureAction, AdventureCreated, AdventuresLoaded, AdventureUpdateContentSharing, AdventureUpdateInvite, AdventureUpdateName } from "./AdventureStore.Actions";
import { AdventureDefaultState, AdventureState } from "./AdventureStore.State";

export const AdventureReducer: Reducer<AdventureState> = (state: AdventureState | undefined, incomingAction: Action): AdventureState => {
    if (state == undefined) {
        return AdventureDefaultState;
    }
    const action = incomingAction as AdventureAction;
    switch (action.type) {
        case 'ADVENTURES_LOADED':
            return loadAdventures(state, action);
        case 'ADVENTURE_CREATED':
            return createAdventure(state, action);
        case 'ADVENTURE_UPDATE_NAME':
            return updateName(state, action);
        case 'ADVENTURE_UPDATE_CONTENT_SHARING':
            return updateContentSharing(state, action);
        case 'ADVENTURE_UPDATE_INVITE':
            return updateInvite(state, action);
        default:
            return state;
    }
}

const loadAdventures = (state: AdventureState, action: AdventuresLoaded): AdventureState => {
    const { adventures } = action;
    const set = new SortedSet(state.adventures);
    set.addOrUpdateRange(...adventures);
    return { ...state, adventures: [...set], loaded: true };
}

const createAdventure = (state: AdventureState, action: AdventureCreated): AdventureState => {
    const { adventure } = action;
    const set = new SortedSet(state.adventures);
    set.update(adventure);
    return { ...state, adventures: [...set] };
}

const updateName = (state: AdventureState, action: AdventureUpdateName): AdventureState => {
    const { id, name } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }
    adventure.name = name;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}

const updateContentSharing = (state: AdventureState, action: AdventureUpdateContentSharing): AdventureState => {
    const { id, allowContentSharing } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }
    adventure.allowsSharedContent = allowContentSharing;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}

const updateInvite = (state: AdventureState, action: AdventureUpdateInvite): AdventureState => {
    const { id, inviteId } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }adventure.inviteId = inviteId;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}