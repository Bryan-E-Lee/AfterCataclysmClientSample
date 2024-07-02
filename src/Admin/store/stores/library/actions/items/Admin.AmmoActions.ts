import { AmmoInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { SuccessToast, ErrorToast } from "../../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../../AdminState";
import { AdminItemCreate, AdminItemUpdate } from "./AdminItemActionTypes";


export const AmmoActions = {
    createAmmo: (initializer: AmmoInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminItemCreate | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { ammo } } = getState();
            const response = await ammo.create(initializer);

            if (response.status == 'Success') {
                dispatch({ type: 'ADMIN_ITEMS_CREATE', item: response.payload });
                ToastDispatchables.toast(new SuccessToast(`"${response.payload.name}" created.`), dispatch);
                successCallback(response.payload.id);
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    patchAmmo: (oldVersion: AmmoInitializer, newVersion: AmmoInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { ammo } } = getState();
                const response = await ammo.patch(oldVersion, newVersion);

                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ITEMS_UPDATE', item: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`"${response.payload.name}" created.`), dispatch);
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

    updateAmmo: (initializer: AmmoInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { ammo } } = getState();
                const response = await ammo.update(initializer);

                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ITEMS_UPDATE', item: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`"${response.payload.name}" updated.`), dispatch);
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}