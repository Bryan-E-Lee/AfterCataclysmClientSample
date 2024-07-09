import { Action, Reducer } from "redux";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { AdventureAction, AdventureCreated, AdventureSetCommunalDice, AdventureSetRolling, AdventuresLoaded, AdventureUpdateContentSharing, AdventureUpdateInvite, AdventureUpdateName, AdventureUpdatePrivateNotes, AdventureUpdatePublicNotes } from "./AdventureStore.Actions";
import { AdventureDefaultState, AdventureState } from "./AdventureStore.State";
import { Adventure, LocalAdventure } from "../../../entities/adventures/Adventure";

export const AdventureReducer: Reducer<AdventureState> = (state: AdventureState | undefined, incomingAction: Action): AdventureState => {
    if (state == undefined) {
        return AdventureDefaultState;
    }
    const action = incomingAction as AdventureAction;
    switch (action.type) {
        case 'ADVENTURES_LOADED': return loadAdventures(state, action);
        case 'ADVENTURES_LOAD_ERROR': return { ...state, error: true };
        case 'ADVENTURE_CREATED': return createAdventure(state, action);
        case 'ADVENTURE_UPDATE_NAME': return updateName(state, action);
        case 'ADVENTURE_UPDATE_CONTENT_SHARING': return updateContentSharing(state, action);
        case 'ADVENTURE_UPDATE_INVITE': return updateInvite(state, action);
        case 'ADVENTURE_UPDATE_PUBLIC_NOTES': return updatePublicnotes(state, action);
        case 'ADVENTURE_UPDATE_PRIVATE_NOTES': return updatePrivateNotes(state, action);
        case 'ADVENTURE_SET_COMMUNAL_DICE': return updateCommunalDice(state, action);
        case 'ADVENTURE_SET_ROLLING': return updateSetRolling(state, action);
        default: return state;
    }
}

const createNewLocalAdventure = (adventure: Adventure): LocalAdventure => ({ ...adventure, rolling: false });

const loadAdventures = (state: AdventureState, action: AdventuresLoaded): AdventureState => {
    const { adventures } = action;
    const set = new SortedSet(state.adventures);
    set.addOrUpdateRange(...adventures.map(createNewLocalAdventure));
    return { ...state, adventures: [...set], loaded: true, error: false, };
}

const createAdventure = (state: AdventureState, action: AdventureCreated): AdventureState => {
    const { adventure } = action;
    const set = new SortedSet(state.adventures);
    set.update(createNewLocalAdventure(adventure));
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

const updatePublicnotes = (state: AdventureState, action: AdventureUpdatePublicNotes): AdventureState => {
    const { id, publicNotes } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }

    adventure.publicNotes = publicNotes;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}

const updatePrivateNotes = (state: AdventureState, action: AdventureUpdatePrivateNotes): AdventureState => {
    const { id, privateNotes } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }

    adventure.privateNotes = privateNotes;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}

const updateCommunalDice = (state: AdventureState, action: AdventureSetCommunalDice): AdventureState => {
    const { id, communalDice } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }

    adventure.communalDice = communalDice;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}

const updateSetRolling = (state: AdventureState, action: AdventureSetRolling): AdventureState => {
    const { id, rolling } = action;
    const set = new SortedSet(state.adventures);
    const adventure = set.get(id);
    if (adventure == null) {
        return state;
    }

    adventure.rolling = rolling;
    set.update(adventure);
    return { ...state, adventures: [...set] };
}