import { ModInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { ErrorToast, SuccessToast } from "../../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../../AdminState";
import { AmmoActions } from "./Admin.AmmoActions";
import { SpellActions } from "./Admin.SpellActions";
import { AdminItemCreate, AdminItemUpdate } from "./AdminItemActionTypes";

export const ModActions = {
    createMod: (initializer: ModInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminItemCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { mods } } = getState();
                const response = await mods.create(initializer);

                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ITEMS_CREATE', item: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`"${response.payload.name}" created.`), dispatch);
                    successCallback(response.payload.id);
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    patchMod: (oldVersion: ModInitializer, newVersion: ModInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { mods } } = getState();
                const response = await mods.patch(oldVersion, newVersion);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ITEMS_UPDATE', item: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`"${response.payload.name}" patched.`), dispatch);
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateMod: (initializer: ModInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { mods } } = getState();
                const response = await mods.update(initializer);

                if (response.validationResults) {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else if (response.payload) {
                    dispatch({ type: 'ADMIN_ITEMS_UPDATE', item: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`"${response.payload.name}" updated.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },
        
    ...AmmoActions,
    ...SpellActions
}