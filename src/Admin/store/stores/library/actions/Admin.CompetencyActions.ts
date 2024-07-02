import { CompetencyInitializer } from "../../../../../entities/characters/Competencies";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminCompetenciesLoaded = { type: 'ADMIN_COMPETENCIES_LOADED', competencies: CompetencyInitializer[] }
type AdminCompetencyCreate = { type: 'ADMIN_COMPETENCY_CREATE', competency: CompetencyInitializer }
type AdminCompetencyUpdate = { type: 'ADMIN_COMPETENCY_UPDATE', competency: CompetencyInitializer }
type AdminCompetencyDelete = { type: 'ADMIN_COMPETENCY_DELETE', id: string }

export type AdminCompetencyAction = AdminCompetenciesLoaded | AdminCompetencyCreate | AdminCompetencyUpdate | AdminCompetencyDelete;

export const CompetencyActions = {
    loadCompetencies: (): AdminThunkAction<AdminCompetenciesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.competencies;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_COMPETENCIES_LOADED', competencies: response.payload });
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

    createCompetency: (initializer: CompetencyInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminCompetencyCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.competencies;
                const response = await api.create(initializer);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_COMPETENCY_CREATE', competency: response.payload });
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

    updateCompetency: (initializer: CompetencyInitializer): AdminThunkAction<AdminCompetencyUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.competencies;
                const response = await api.update(initializer);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_COMPETENCY_UPDATE', competency: response.payload });
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
    
    deleteCompetency: (initializer: CompetencyInitializer): AdminThunkAction<AdminCompetencyDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.competencies;
                const response = await api.delete(initializer.id);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${initializer.name}.`), dispatch);
                    dispatch({ type: 'ADMIN_COMPETENCY_DELETE', id: initializer.id });
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