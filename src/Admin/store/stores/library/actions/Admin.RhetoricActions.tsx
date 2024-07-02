import { RhetoricInitializer } from "../../../../../entities/library/socials/Rhetoric";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminRhetoricsLoaded = { type: 'ADMIN_RHETORICS_LOADED', rhetorics: RhetoricInitializer[] }
type AdminRhetoricUpdate = { type: 'ADMIN_RHETORIC_UPDATE', rhetoric: RhetoricInitializer }

export type AdminRhetoricAction = AdminRhetoricsLoaded | AdminRhetoricUpdate;

export const RhetoricActions = {
    loadRhetorics: (): AdminThunkAction<AdminRhetoricsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.rhetorics;
                const response = await api.getAll();
                if (response.payload != null) {
                    dispatch({ type: 'ADMIN_RHETORICS_LOADED', rhetorics: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast("Error loading rhetorics"), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast("Error loading rhetorics."), dispatch);
            }
        },

    updateRhetoric: (initializer: RhetoricInitializer): AdminThunkAction<AdminRhetoricUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.rhetorics;
                const response = await api.update(initializer)

                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    return;
                }
                
                dispatch({ type: 'ADMIN_RHETORIC_UPDATE', rhetoric: response.payload });
                ToastDispatchables.toast(new SuccessToast(`${response.payload?.name} updated.`), dispatch);
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(`Error updating ${initializer.name}.`), dispatch);
            }
        }
}