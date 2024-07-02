import { SpellInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { SuccessToast, ErrorToast } from "../../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../../AdminState";
import { AdminItemCreate, AdminItemUpdate } from "./AdminItemActionTypes";

export const SpellActions = {
    createSpell: (initializer: SpellInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminItemCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { spells } } = getState();
                const response = await spells.create(initializer);

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

    patchSpell: (oldVersion: SpellInitializer, newVersion: SpellInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { spells } } = getState();
                const response = await spells.patch(oldVersion, newVersion);

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

    updateSpell: (initializer: SpellInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { spells } } = getState();
                const response = await spells.update(initializer);

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