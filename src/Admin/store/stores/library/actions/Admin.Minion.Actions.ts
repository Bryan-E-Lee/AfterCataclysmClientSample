import { MinionInitializer } from "../../../../../entities/library/minions/Minion";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminMinionsLoaded = { type: 'ADMIN_MINIONS_LOADED', minions: MinionInitializer[] };
type AdminMinionCreate = { type: 'ADMIN_MINION_CREATE', minion: MinionInitializer};
type AdminMinionUpdate = { type: 'ADMIN_MINION_UPDATE', minion: MinionInitializer };
type AdminMinionDelete = { type: 'ADMIN_MINION_DELETE', id: string };

export type AdminMinionAction = AdminMinionsLoaded
    | AdminMinionCreate
    | AdminMinionUpdate
    | AdminMinionDelete;

export const MinionActions = {
    loadMinions: (): AdminThunkAction<AdminMinionsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { minions } } = getState();
                const response = await minions.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_MINIONS_LOADED', minions: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast('Error loading minions.'), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createMinion: (initializer: MinionInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminMinionCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { minions } } = getState();
                const response = await minions.create(initializer);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_MINION_CREATE', minion: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${initializer.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateMinion: (initializer: MinionInitializer): AdminThunkAction<AdminMinionUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { minions } } = getState();
                const response = await minions.update(initializer);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_MINION_UPDATE', minion: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Eror creating ${initializer.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },
    
    deleteMinion: (initializer: MinionInitializer): AdminThunkAction<AdminMinionDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { minions } } = getState();
                const response = await minions.delete(initializer.id);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${initializer.name}.`), dispatch);
                    dispatch({ type: 'ADMIN_MINION_DELETE', id: initializer.id });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${initializer.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}