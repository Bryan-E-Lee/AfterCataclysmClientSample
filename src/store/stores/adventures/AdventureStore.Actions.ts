import { Adventure, CommunalDice } from "../../../entities/adventures/Adventure";
import { AdventureEvent } from "../../../entities/adventures/AdventureEvent";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { DieFace } from "../../../entities/rolls/Roll";
import { ErrorToast, InfoToast, SuccessToast } from "../../../entities/toasts/Toasts";
import { AppThunkAction } from "../ApplicationState";
import { ToastAction, ToastDispatchables } from "../toasts/Toasts.Actions";
import { UniversalActions } from "../UniversalActions";
import { UserActions } from "../users/UserStore.Actions";

export type AdventuresLoaded = { type: 'ADVENTURES_LOADED', adventures: Adventure[] }
export type AdventuresLoadError = { type: 'ADVENTURES_LOAD_ERROR' }
export type AdventureCreated = { type: 'ADVENTURE_CREATED', adventure: Adventure }
export type AdventureUpdateName = { type: 'ADVENTURE_UPDATE_NAME', id: string, name: string };
export type AdventureUpdateContentSharing = { type: 'ADVENTURE_UPDATE_CONTENT_SHARING', id: string, allowContentSharing: boolean }
export type AdventureUpdateInvite = { type: 'ADVENTURE_UPDATE_INVITE', id: string, inviteId: string }
export type AdventureUpdatePublicNotes = { type: 'ADVENTURE_UPDATE_PUBLIC_NOTES', id: string, publicNotes: string }
export type AdventureUpdatePrivateNotes = { type: 'ADVENTURE_UPDATE_PRIVATE_NOTES', id: string, privateNotes: string }
export type AdventurePlayerJoined = { type: 'ADVENTURE_PLAYER_JOINED', id: string, playerId: string }
export type AdventurePlayerLeft = { type: 'ADVENTURE_PLAYER_LEFT', id: string, playerId: string }
export type AdventurePushNewEvent = { type: 'ADVENTURE_PUSH_NEW_EVENT', id: string, event: AdventureEvent }
export type AdventureSetCommunalDice = { type: 'ADVENTURE_SET_COMMUNAL_DICE', id: string, communalDice: CommunalDice }
export type AdventureSetRolling = { type: 'ADVENTURE_SET_ROLLING', id: string, rolling: boolean }

export type AdventureAction = AdventuresLoaded | AdventuresLoadError | AdventureCreated | AdventureUpdateName
    | AdventureUpdateContentSharing | AdventureUpdateInvite | AdventureUpdatePublicNotes | AdventureUpdatePrivateNotes
    | AdventurePlayerJoined | AdventurePlayerLeft | AdventurePushNewEvent | AdventureSetCommunalDice
    | AdventureSetRolling;

const getAdventure = (id: string): AppThunkAction<AdventuresLoaded | ToastAction> => 
    async (dispatch, getState) => {
        try {
            const api = getState().api.adventures;
            const response = await api.getAdventure(id);
            if (response.status == 'Success') {
                dispatch({ type: 'ADVENTURES_LOADED', adventures: [response.payload] });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        }
        catch (e) {
            console.error(e);
            UniversalActions.navToError(dispatch);
        }
    };

export const AdventureActions = Object.freeze({
    getAdventure,

    getAdventures: (): AppThunkAction<AdventuresLoaded | AdventuresLoadError | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.adventures;
                const response = await api.getUserAdventures(true);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADVENTURES_LOADED', adventures: response.payload });
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch(e) {
                console.error(e);
                dispatch({ type: 'ADVENTURES_LOAD_ERROR' });
                ToastDispatchables.toast(new ErrorToast("Error loading adventures."), dispatch);
                // UniversalActions.navToError(dispatch);
            }
        },

    createAdventure: (successCallback: (id: string) => unknown): AppThunkAction<AdventureCreated | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.adventures;
                const response = await api.createAdventure();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADVENTURE_CREATED',  adventure: response.payload });
                    successCallback(response.payload.id);
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch(e) {
                console.error(e);
                UniversalActions.navToError(dispatch);
            }
        },

    updateName: (adventure: Adventure, name: string): AppThunkAction<AdventureUpdateName | ToastAction> =>
        async (dispatch, getState) => {
            const oldVersion = { ...adventure };
            const newVersion = { ...adventure, name };
            const api = getState().api.adventures;

            const undo = () => {
                dispatch({ type: 'ADVENTURE_UPDATE_NAME', id: adventure.id, name: oldVersion.name })
                ToastDispatchables.toast(new ErrorToast('Error updating name.'), dispatch);
            }
            dispatch({ type: 'ADVENTURE_UPDATE_NAME', id: adventure.id, name });
            try {
                const response = await api.update(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    setPublicNotes: (adventure: Adventure, publicNotes: string): AppThunkAction<AdventureUpdatePublicNotes | ToastAction> =>
        async (dispatch, getState) => {
            const newAdventure = {
                ...adventure,
                publicNotes
            }

            const api = getState().api.adventures;
            try {
                const response = await api.update(adventure, newAdventure);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADVENTURE_UPDATE_PUBLIC_NOTES', id: adventure.id, publicNotes });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast("Adventure notes not updated."), dispatch);
                }
            }
            catch (e) {
                ToastDispatchables.toast(new ErrorToast("Error updating notes."), dispatch);
            }
        },

    setPrivateNotes: (adventure: Adventure, privateNotes: string): AppThunkAction<AdventureUpdatePrivateNotes | ToastAction> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ADVENTURE_UPDATE_PRIVATE_NOTES', id: adventure.id, privateNotes });

            const newAdventure = {
                ...adventure,
                privateNotes
            }
            const api = getState().api.adventures;
            try {
                const response = await api.update(adventure, newAdventure);
                if (response.status == 'Error') {
                    dispatch({ type: 'ADVENTURE_UPDATE_PRIVATE_NOTES', id: adventure.id, privateNotes: adventure.privateNotes });
                    ToastDispatchables.toast(new ErrorToast("Adventure notes not updated."), dispatch);
                }
            }
            catch (e) {
                dispatch({ type: 'ADVENTURE_UPDATE_PRIVATE_NOTES', id: adventure.id, privateNotes: adventure.privateNotes });
                ToastDispatchables.toast(new ErrorToast("Error updating notes."), dispatch);
            }
        },

    setContentSharing: (adventure: Adventure, allowContentSharing: boolean): AppThunkAction<AdventureUpdateContentSharing | ToastAction> =>
        async (dispatch, getState) => {
            const oldVersion = { ...adventure };
            const newVersion = { ...adventure, allowContentSharing };
            const api = getState().api.adventures;

            const undo = () => {
                dispatch({ type: 'ADVENTURE_UPDATE_CONTENT_SHARING', id: adventure.id, allowContentSharing: oldVersion.allowsSharedContent });
                ToastDispatchables.toast(new ErrorToast(`Error ${allowContentSharing ? 'enabling' : 'disabling'} content sharing`), dispatch);
            }
            dispatch({ type: 'ADVENTURE_UPDATE_CONTENT_SHARING', id: adventure.id, allowContentSharing });
            try {
                const response = await api.update(oldVersion, newVersion);
                if (response.status == 'Error') {
                    undo();
                }
            }
            catch (e) {
                undo();
                console.error(e);
            }
        },

    resetInvite: (adventure: Adventure): AppThunkAction<AdventureUpdateInvite | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.adventures;
            const onError = () => ToastDispatchables.toast(new ErrorToast("Error reseting invite link."), dispatch);
            try {
                const response = await api.resetInvite(adventure.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADVENTURE_UPDATE_INVITE', id: adventure.id, inviteId: response.payload });
                    ToastDispatchables.toast(new SuccessToast("Invite link updated."), dispatch);
                }
                else {
                    onError();
                }
            }
            catch (e) {
                console.error(e);
                onError();
            }
        },

    join: (inviteId: string, successCallback: (id: string) => unknown, errorCallback: () => unknown): AppThunkAction<ReturnType<typeof getAdventure> | ToastAction> =>
        async (dispatch, getState) => {
            const {api, user} = getState();
            try {
                const response = await api.adventures.join(user.adventureConnectionId, inviteId);
                if (response.status == 'Success') {
                    await dispatch(getAdventure(response.payload));
                    successCallback(response.payload);
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    errorCallback();
                }
            }
            catch (e) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast("Error joining adventure."), dispatch);
                errorCallback();
                throw e;
            }
        },

    playerJoined: (id: string, playerId: string): AppThunkAction<ReturnType<typeof UserActions.getUsersByIds> | AdventurePlayerJoined | ToastAction> =>
        async (dispatch, getState) => {
            await dispatch(UserActions.getUsersByIds(playerId));
            dispatch({ type: 'ADVENTURE_PLAYER_JOINED', id, playerId });

            const { users } = getState().user;
            const player = users.find(p => p.id == playerId);
            if (player != null) {
                ToastDispatchables.toast(new InfoToast(`${player.name} joined the adventure.`), dispatch);
            }
        },

    leave: (id: string, successCallback: () => unknown): AppThunkAction<ToastAction> =>
        async (dispatch, getState) => {
            const {api, user} = getState();
            try {
                const response = await api.adventures.leave(user.adventureConnectionId, id);
                if (response.status == 'Success') {
                    successCallback();
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast('Error leaving adventure.'), dispatch);
                throw e;
            }
        },

    playerLeft: (id: string, playerId: string): AppThunkAction<AdventurePlayerLeft | ToastAction> =>
        (dispatch, getState) => {
            dispatch({ type: 'ADVENTURE_PLAYER_LEFT', id, playerId });

            const { users } = getState().user;
            const player = users.find(p => p.id == playerId);
            if (player != null) {
                ToastDispatchables.toast(new InfoToast(`${player.name} left the adventure.`), dispatch);
            }
        },

    deactivate: (id: string): AppThunkAction<ToastAction> => 
        async (dispatch, getState) => {
            const api = getState().api.adventures;
            try {
                const response = await api.deactivate(id);
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast("Error deactivating adventure."), dispatch);
                throw e;
            }
        },

    pushNewEvent: (id: string, event: AdventureEvent): AppThunkAction<AdventurePushNewEvent | ToastAction> =>
        (dispatch) => {
            dispatch({ type: 'ADVENTURE_PUSH_NEW_EVENT', id, event });
            ToastDispatchables.toast(new InfoToast(event.text), dispatch);
        },

    setCommunalDice: (id: string, communalDice: CommunalDice): AppThunkAction<AdventureSetCommunalDice | ToastAction> =>
        async (dispatch, getState) => {
            const state = getState();
            const { api, user } = state;
            const adventureSet = new SortedSet(state.adventure.adventures);
            const adventure = adventureSet.get(id);
            if (adventure == null) {
                ToastDispatchables.toast(new ErrorToast("Adventure not found!"), dispatch);
                return;
            }

            const undo = () => {
                dispatch({ type: 'ADVENTURE_SET_COMMUNAL_DICE', id, communalDice: adventure.communalDice });
                ToastDispatchables.toast(new ErrorToast("Error setting communal dice."), dispatch);
            }
            try {
                dispatch({ type: 'ADVENTURE_SET_COMMUNAL_DICE', id, communalDice });
                const response = await api.adventures.setCommunalDice(user.adventureConnectionId, id, communalDice);
                if (response.status == 'Error') {
                    undo();
                }
            }
            catch (e) {
                console.error(e);
                undo();
            }
        },

    rollCommunalDice: (id: string): AppThunkAction<AdventureSetCommunalDice | AdventureSetRolling | ToastAction> => 
        async (dispatch, getState) => {
            const state = getState();
            const { api, user } = state;
            const adventureSet = new SortedSet(state.adventure.adventures);
            const adventure = adventureSet.get(id);
            if (adventure == null) {
                ToastDispatchables.toast(new ErrorToast("Adventure not found!"), dispatch);
                return;
            }

            const undo = () => {
                dispatch({ type: 'ADVENTURE_SET_COMMUNAL_DICE', id, communalDice: adventure.communalDice });
                ToastDispatchables.toast(new ErrorToast("Error rolling communal dice."), dispatch);
            }
            try {
                dispatch({ type: 'ADVENTURE_SET_ROLLING', id, rolling: true });
                const response = await api.adventures.rollCommunalDice(user.adventureConnectionId, id);
                if (response.status == 'Error') {
                    undo();
                    return;
                }
                dispatch({ type: 'ADVENTURE_SET_COMMUNAL_DICE', id, communalDice: response.payload });
            }
            catch (e) {
                console.error(e);
                undo();
            }
            finally {
                dispatch({ type: 'ADVENTURE_SET_ROLLING', id, rolling: false });
            }
        },

    receiveCommunalDice: (id: string, communalDice: CommunalDice): AppThunkAction<AdventureSetCommunalDice> =>
        (dispatch) => dispatch({ type: 'ADVENTURE_SET_COMMUNAL_DICE', id, communalDice })
});