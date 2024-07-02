import { SuccessToast, ErrorToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";
import { Scenario } from "../../../../../entities/library/scenarios/Scenario";

type AdminScenariosLoaded = { type: 'ADMIN_SCENARIOS_LOADED', scenarios: Scenario[] };
type AdminScenarioCreate = { type: 'ADMIN_SCENARIO_CREATE', scenario: Scenario };
type AdminScenarioUpdate = { type: 'ADMIN_SCENARIO_UPDATE', scenario: Scenario };
type AdminScenarioDelete = { type: 'ADMIN_SCENARIO_DELETE', id: string; }

export type AdminScenarioAction = AdminScenariosLoaded | AdminScenarioCreate | AdminScenarioUpdate | AdminScenarioDelete;

export const ScenarioActions = {
    loadScenarios: (): AdminThunkAction<AdminScenariosLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { scenarios } } = getState();
                const response = await scenarios.getAll();
                if (response.payload != null) {
                    dispatch({ type: 'ADMIN_SCENARIOS_LOADED', scenarios: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast('Error loading scenarios.'), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createScenario: (initializer: Scenario, successCallback: (id: string) => unknown): AdminThunkAction<AdminScenarioCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { scenarios } } = getState();
                const response = await scenarios.create(initializer);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_SCENARIO_CREATE', scenario: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
            }
            catch (e: any) {    
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateScenario: (initializer: Scenario): AdminThunkAction<AdminScenarioUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { scenarios } } = getState();
                const response = await scenarios.update(initializer);
                if (response.status == 'Success') {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_SCENARIO_UPDATE', scenario: response.payload });
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

    deleteScenario: (scenario: Scenario): AdminThunkAction<AdminScenarioDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                if (!confirm(`Are you sure you want to delete ${scenario.name}?`)) {
                    return;
                }
                const { api: { scenarios } } = getState();
                const response = await scenarios.delete(scenario.id);
                if (response.validationResults) {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    dispatch({ type: 'ADMIN_SCENARIO_DELETE', id: scenario.id });
                }
                else {
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${scenario.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}