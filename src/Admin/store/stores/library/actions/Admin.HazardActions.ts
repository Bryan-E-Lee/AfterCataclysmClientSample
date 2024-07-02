import { Hazard } from "../../../../../entities/library/hazards/Hazard";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminHazardsLoaded = { type: 'ADMIN_HAZARDS_LOADED', hazards: Hazard[] }
type AdminHazardCreate = { type: 'ADMIN_HAZARD_CREATE', hazard: Hazard }
type AdminHazardUpdate = { type: 'ADMIN_HAZARD_UPDATE', hazard: Hazard }
type AdminHazardDelete = { type: 'ADMIN_HAZARD_DELETE', id: string }

export type AdminHazardAction = AdminHazardsLoaded | AdminHazardCreate | AdminHazardUpdate | AdminHazardDelete;

export const HazardActions = {
    loadHazards: (): AdminThunkAction<AdminHazardsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.hazards;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_HAZARDS_LOADED', hazards: response.payload });
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
    
    createHazard: (hazard: Hazard, successCallback: (id: string) => unknown): AdminThunkAction<AdminHazardCreate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.hazards;
            try { 
                const response = await api.create(hazard);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_HAZARD_CREATE', hazard: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${hazard.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateHazard: (hazard: Hazard): AdminThunkAction<AdminHazardUpdate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.hazards;
            try {
                const response = await api.update(hazard);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_HAZARD_UPDATE', hazard: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error updating ${hazard.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deleteHazard: (hazard: Hazard): AdminThunkAction<AdminHazardDelete | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.hazards;
            try {
                const response = await api.delete(hazard.id);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${hazard.name}.`), dispatch);
                    dispatch({ type: 'ADMIN_HAZARD_DELETE', id: hazard.id });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${hazard.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}