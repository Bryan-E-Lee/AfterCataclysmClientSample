import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { ErrorToast, SuccessToast } from "../../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../../AdminState";
import { ModActions } from "./Admin.ModActions";
import { WeaponActions } from "./Admin.WeaponActions";
import { AdminItemsLoaded, AdminItemCreate, AdminItemUpdate, AdminItemDelete } from "./AdminItemActionTypes";

export type AdminItemAction = AdminItemsLoaded | AdminItemCreate | AdminItemUpdate | AdminItemDelete;

export const ItemActions = {
    loadItems: (): AdminThunkAction<AdminItemsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { items } } = getState();
            const response = await items.getItems();
            if (response.status == 'Success') {
                dispatch({ type: 'ADMIN_ITEMS_LOADED', items: response.payload });
            }
            else {
                const toasts = response.validationResults.map(vr => new ErrorToast(vr.message));
                ToastDispatchables.toastRange(toasts, dispatch);
            }
        },
        
    createItem: (initializer: ItemInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminItemCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { items } } = getState();
                const response = await items.create(initializer);
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

    patchItem: (oldVersion: ItemInitializer, newVersion: ItemInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { items } } = getState();
                const response = await items.patch(oldVersion, newVersion);
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

    updateItem: (initializer: ItemInitializer): AdminThunkAction<AdminItemUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { items } } = getState();
                const response = await items.update(initializer);
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
        },

    deleteItem: (item: ItemInitializer): AdminThunkAction<AdminItemDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
                    return;
                }
                const { api: { items } } = getState();
                const response = await items.delete(item.id);
                if (response.validationResults) {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else if (response.payload) {
                    dispatch({ type: 'ADMIN_ITEMS_DELETE', id: item.id });
                    ToastDispatchables.toast(new SuccessToast(`"${item.name}" deleted.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast('No payload and no error messages to display.'), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    ...WeaponActions,
    ...ModActions
}