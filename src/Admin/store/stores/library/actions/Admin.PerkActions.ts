import { PerkInitializer } from "../../../../../entities/library/perks/Perk";
import { SuccessToast, ErrorToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminPerksLoaded = { type: 'ADMIN_PERKS_LOADED', perks: PerkInitializer[] };
type AdminPerkCreate = { type: 'ADMIN_PERK_CREATE', perk: PerkInitializer };
type AdminPerkUpdate = { type: 'ADMIN_PERK_UPDATE', perk: PerkInitializer };
type AdminPerkDelete = { type: 'ADMIN_PERK_DELETE', id: string; }

export type AdminPerkAction = AdminPerksLoaded | AdminPerkCreate | AdminPerkUpdate | AdminPerkDelete;

export const PerkActions = {
    loadPerks: (): AdminThunkAction<AdminPerksLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { perks } } = getState();
                const response = await perks.getAll();
                if (response.payload != null) {
                    dispatch({ type: 'ADMIN_PERKS_LOADED', perks: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast('Error loading perks.'), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createPerk: (initializer: PerkInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminPerkCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { perks } } = getState();
                const response = await perks.create(initializer);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_PERK_CREATE', perk: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updatePerk: (initializer: PerkInitializer): AdminThunkAction<AdminPerkUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { perks } } = getState();
                const response = await perks.update(initializer);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_PERK_UPDATE', perk: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error updating ${initializer.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deletePerk: (perk: PerkInitializer): AdminThunkAction<AdminPerkDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                if (!confirm(`Are you sure you want to delete ${perk.name}?`)) {
                    return;
                }
                const { api: { perks } } = getState();
                const response = await perks.delete(perk.id);
                if (response.validationResults) {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    dispatch({ type: 'ADMIN_PERK_DELETE', id: perk.id });
                }
                else {
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${perk.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}