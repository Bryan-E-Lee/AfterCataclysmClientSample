import { ErrorToast } from "../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../AdminState";
import { AdminMinionAction, MinionActions } from "./actions/Admin.Minion.Actions";
import { AdminPerkAction, PerkActions } from "./actions/Admin.PerkActions";
import { AdminPersonalityAction, PersonalityActions } from "./actions/Admin.PersonalityActions";
import { AdminSkillAction, SkillActions } from "./actions/Admin.SkillActions";
import { AdminConditionAction, ConditionActions } from "./actions/Admin.ConditionActions";
import { ItemActions, AdminItemAction } from "./actions/items/Admin.ItemActions";
import { AdminCompetencyAction, CompetencyActions } from "./actions/Admin.CompetencyActions";
import { AdminRhetoricAction, RhetoricActions } from "./actions/Admin.RhetoricActions";
import { AdminHazardAction, HazardActions } from "./actions/Admin.HazardActions";
import { AdminEnemyAction, EnemyActions } from "./actions/Admin.EnemyActions";
import { AdminEnemyAbilityAction, EnemyAbilityActions } from "./actions/Admin.EnemyAbilityActions";
import { AdminBookAction, BookActions } from "./actions/Admin.BookActions";
import { AdminScenarioAction, ScenarioActions } from "./actions/Admin.ScenarioActions";
import { AdminVehicleAction, VehicleActions } from "./actions/Admin.Vehicle.Actions";

export type AdminSlotTypesLoaded = { type: 'LIBRARY_SLOT_TYPES_LOADED', slotTypes: string[] };
export type AdminTagsLoaded = { type: 'LIBRARY_TAGS_LOADED', tags: string[] };
export type AdminTagsAdded = { type: 'LIBRARY_TAGS_ADDED', tags: string[] };

export type AdminLibraryAction = AdminBookAction
    | AdminCompetencyAction
    | AdminConditionAction
    | AdminEnemyAction
    | AdminEnemyAbilityAction
    | AdminHazardAction
    | AdminItemAction
    | AdminMinionAction
    | AdminPerkAction
    | AdminPersonalityAction
    | AdminRhetoricAction
    | AdminScenarioAction
    | AdminSkillAction
    | AdminSlotTypesLoaded
    | AdminTagsLoaded
    | AdminVehicleAction;

export const AdminLibraryActions = {
    ...BookActions,
    ...CompetencyActions,
    ...ConditionActions,
    ...EnemyActions,
    ...EnemyAbilityActions,
    ...HazardActions,
    ...ItemActions,
    ...MinionActions,
    ...PerkActions,
    ...PersonalityActions,
    ...RhetoricActions,
    ...ScenarioActions,
    ...SkillActions,
    ...VehicleActions,

    loadTags: (): AdminThunkAction<AdminTagsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { tags } } = getState();
                const response = await tags.getTags();
                if (response.payload) {
                    dispatch({ type: 'LIBRARY_TAGS_LOADED', tags: response.payload });
                }
                else if (response.validationResults != null) {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast("No payload and no validation results for tag load."), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    addNewTags: (newTags: string[]): AdminThunkAction<AdminTagsAdded | ToastAction> =>
        async (dispatch, getState) => {
            if (!newTags.any()) {
                return;
            }
            try {
                const { api: { tags } } = getState();
                const response = await tags.addTags(newTags);
                if (response.status == 'Success') {
                    dispatch({ type: 'LIBRARY_TAGS_ADDED', tags: newTags });
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