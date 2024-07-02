import { Condition } from "../../../../../entities/characters/Conditions"
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts"
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions"
import { AdminThunkAction } from "../../AdminState"

type AdminConditionsLoaded = { type: 'ADMIN_CONDITIONS_LOADED', conditions: Condition[] }
type AdminConditionCreate = { type: 'ADMIN_CONDITION_CREATE', condition: Condition }
type AdminConditionUpdate = { type: 'ADMIN_CONDITION_UPDATE', condition: Condition }
type AdminConditionDelete = { type: 'ADMIN_CONDITION_DELETE', id: string }

export type AdminConditionAction = AdminConditionsLoaded | AdminConditionCreate | AdminConditionUpdate | AdminConditionDelete;

export const ConditionActions = {
    loadConditions: (): AdminThunkAction<AdminConditionsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.conditions;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_CONDITIONS_LOADED', conditions: response.payload });
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

        createCondition: (initializer: Condition, successCallback: (id: string) => unknown): AdminThunkAction<AdminConditionCreate | ToastAction> =>
            async (dispatch, getState) => {
                const api = getState().api.conditions;
                try {
                    const response = await api.create(initializer);
                    if (response.status == 'Success') {
                        dispatch({ type: 'ADMIN_CONDITION_CREATE', condition: response.payload });
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
    
        updateCondition: (initializer: Condition): AdminThunkAction<AdminConditionUpdate | ToastAction> =>
            async (dispatch, getState) => {
                const api = getState().api.conditions;
                try {
                    const response = await api.update(initializer);
                    if (response.status == 'Success') {
                        ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                        dispatch({ type: 'ADMIN_CONDITION_UPDATE', condition: response.payload });
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
        
        deleteCondition: (initializer: Condition): AdminThunkAction<AdminConditionDelete | ToastAction> =>
            async (dispatch, getState) => {
                const api = getState().api.conditions;
                try {
                    const response = await api.delete(initializer.id);
                    if (response.status == 'Success') {
                        ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${initializer.name}.`), dispatch);
                        dispatch({ type: 'ADMIN_CONDITION_DELETE', id: initializer.id });
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