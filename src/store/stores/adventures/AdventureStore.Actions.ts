import { Adventure } from "../../../entities/adventures/Adventure";
import { AdventureEvent } from "../../../entities/adventures/AdventureEvent";
import { DieFace } from "../../../entities/rolls/Roll";
import { ErrorToast, InfoToast, SuccessToast } from "../../../entities/toasts/Toasts";
import { AppThunkAction } from "../ApplicationState";
import { ToastAction, ToastDispatchables } from "../toasts/Toasts.Actions";
import { UniversalActions } from "../UniversalActions";
import { UserActions } from "../users/UserStore.Actions";

export type AdventuresLoaded = { type: 'ADVENTURES_LOADED', adventures: Adventure[] }
export type AdventureCreated = { type: 'ADVENTURE_CREATED', adventure: Adventure }
export type AdventureUpdateName = { type: 'ADVENTURE_UPDATE_NAME', id: string, name: string };
export type AdventureUpdateContentSharing = { type: 'ADVENTURE_UPDATE_CONTENT_SHARING', id: string, allowContentSharing: boolean }
export type AdventureUpdateInvite = { type: 'ADVENTURE_UPDATE_INVITE', id: string, inviteId: string }
export type AdventurePlayerJoined = { type: 'ADVENTURE_PLAYER_JOINED', id: string, playerId: string }
export type AdventurePlayerLeft = { type: 'ADVENTURE_PLAYER_LEFT', id: string, playerId: string }
export type AdventurePushNewEvent = { type: 'ADVENTURE_PUSH_NEW_EVENT', id: string, event: AdventureEvent }
export type AdventureSetCommunalDice = { type: 'ADVENTURE_SET_COMMUNAL_DICE', id: string, dice: DieFace[] }

export type AdventureAction = AdventuresLoaded | AdventureCreated | AdventureUpdateName
    | AdventureUpdateContentSharing | AdventureUpdateInvite | AdventurePlayerJoined
    | AdventurePlayerLeft | AdventurePushNewEvent | AdventureSetCommunalDice;

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

    getAdventures: (): AppThunkAction<AdventuresLoaded | ToastAction> =>
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
                UniversalActions.navToError(dispatch);
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
            const api = getState().api.adventures;
            try {
                const response = await api.join(inviteId);
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
                ToastDispatchables.toast(new InfoToast(`${player.displayName} joined the adventure.`), dispatch);
            }
        },

    leave: (id: string, successCallback: () => unknown): AppThunkAction<ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.adventures;
            try {
                const response = await api.leave(id);
                if (response.status == 'Success') {
                    successCallback();
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast('Error leaving campaign.'), dispatch);
                throw e;
            }
        },

    playerLeft: (id: string, playerId: string): AppThunkAction<AdventurePlayerLeft | ToastAction> =>
        (dispatch, getState) => {
            dispatch({ type: 'ADVENTURE_PLAYER_LEFT', id, playerId });

            const { users } = getState().user;
            const player = users.find(p => p.id == playerId);
            if (player != null) {
                ToastDispatchables.toast(new InfoToast(`${player.displayName} left the adventure.`), dispatch);
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
                ToastDispatchables.toast(new ErrorToast("Error deactivating campaign."), dispatch);
                throw e;
            }
        },

    pushNewEvent: (id: string, event: AdventureEvent): AppThunkAction<AdventurePushNewEvent | ToastAction> =>
        (dispatch) => {
            dispatch({ type: 'ADVENTURE_PUSH_NEW_EVENT', id, event });
            ToastDispatchables.toast(new InfoToast(event.text), dispatch);
        },

    setCommunalDice: (id: string, dice: DieFace[]): AppThunkAction<AdventureSetCommunalDice> =>
        (dispatch) => dispatch({ type: 'ADVENTURE_SET_COMMUNAL_DICE', id, dice }),
});