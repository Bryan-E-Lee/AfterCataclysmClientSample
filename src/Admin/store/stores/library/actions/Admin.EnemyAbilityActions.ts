import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";
import { EnemyAbility, EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility } from "../../../../../entities/library/enemies/EnemyAbilities";

type AdminEnemyActiveAbilitiesLoaded = { type: 'ADMIN_ENEMY_ACTIVE_ABILITIES_LOADED', abilities: EnemyActiveAbility[] }
type AdminEnemyReactiveAbilitiesLoaded = { type: 'ADMIN_ENEMY_REACTIVE_ABILITIES_LOADED', abilities: EnemyReactiveAbility[] }
type AdminEnemyPassiveAbilitiesLoaded = { type: 'ADMIN_ENEMY_PASSIVE_ABILITIES_LOADED', abilities: EnemyPassiveAbility[] }
type AdminEnemyAbilitiesLoaded = AdminEnemyActiveAbilitiesLoaded | AdminEnemyReactiveAbilitiesLoaded | AdminEnemyPassiveAbilitiesLoaded;

type AdminEnemyActiveAbilityCreate = { type: 'ADMIN_ENEMY_ACTIVE_ABILITY_CREATE', ability: EnemyActiveAbility }
type AdminEnemyReactiveAbilityCreate = { type: 'ADMIN_ENEMY_REACTIVE_ABILITY_CREATE', ability: EnemyReactiveAbility }
type AdminEnemyPassiveAbilityCreate = { type: 'ADMIN_ENEMY_PASSIVE_ABILITY_CREATE', ability: EnemyPassiveAbility }
type AdminEnemyAbilityCreate = AdminEnemyActiveAbilityCreate | AdminEnemyReactiveAbilityCreate | AdminEnemyPassiveAbilityCreate;

type AdminEnemyReactiveAbilityUpdate = { type: 'ADMIN_ENEMY_ACTIVE_ABILITY_UPDATE', ability: EnemyActiveAbility }
type AdminEnemyActiveAbilityUpdate = { type: 'ADMIN_ENEMY_REACTIVE_ABILITY_UPDATE', ability: EnemyReactiveAbility }
type AdminEnemyPassiveAbilityUpdate = { type: 'ADMIN_ENEMY_PASSIVE_ABILITY_UPDATE', ability: EnemyPassiveAbility }
type AdminEnemyAbilityUpdate = AdminEnemyReactiveAbilityUpdate | AdminEnemyActiveAbilityUpdate | AdminEnemyPassiveAbilityUpdate;

type AdminEnemyActiveAbilityDelete = { type: 'ADMIN_ENEMY_ACTIVE_ABILITY_DELETE', id: string }
type AdminEnemyReactiveAbilityDelete = { type: 'ADMIN_ENEMY_REACTIVE_ABILITY_DELETE', id: string }
type AdminEnemyPassiveAbilityDelete = { type: 'ADMIN_ENEMY_PASSIVE_ABILITY_DELETE', id: string }
type AdminEnemyAbilityDelete = AdminEnemyReactiveAbilityDelete | AdminEnemyActiveAbilityDelete | AdminEnemyPassiveAbilityDelete;

export type AdminEnemyAbilityAction = AdminEnemyAbilitiesLoaded | AdminEnemyAbilityCreate | AdminEnemyAbilityUpdate | AdminEnemyAbilityDelete;

export const EnemyAbilityActions = {
    loadEnemyActiveAbilities: (): AdminThunkAction<AdminEnemyActiveAbilitiesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyActiveAbilities;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_ACTIVE_ABILITIES_LOADED', abilities: response.payload })
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

    loadEnemyReactiveAbilities: (): AdminThunkAction<AdminEnemyReactiveAbilitiesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyReactiveAbilities;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_REACTIVE_ABILITIES_LOADED', abilities: response.payload })
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

    loadEnemyPassiveAbilities: (): AdminThunkAction<AdminEnemyPassiveAbilitiesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyPassiveAbilities;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_PASSIVE_ABILITIES_LOADED', abilities: response.payload })
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

    createEnemyActiveAbility: (enemy: EnemyActiveAbility, successCallback: (id: string) => unknown): AdminThunkAction<AdminEnemyActiveAbilityCreate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyActiveAbilities;
            try {
                const response = await api.create(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_ACTIVE_ABILITY_CREATE', ability: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createEnemyReactiveAbility: (enemy: EnemyReactiveAbility, successCallback: (id: string) => unknown): AdminThunkAction<AdminEnemyReactiveAbilityCreate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyReactiveAbilities;
            try {
                const response = await api.create(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_REACTIVE_ABILITY_CREATE', ability: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createEnemyPassiveAbility: (enemy: EnemyPassiveAbility, successCallback: (id: string) => unknown): AdminThunkAction<AdminEnemyPassiveAbilityCreate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyPassiveAbilities;
            try {
                const response = await api.create(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_PASSIVE_ABILITY_CREATE', ability: response.payload });
                    successCallback(response.payload.id);
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateEnemyActiveAbility: (enemy: EnemyActiveAbility): AdminThunkAction<AdminEnemyAbilityUpdate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyActiveAbilities;
            try {
                const response = await api.update(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_ACTIVE_ABILITY_UPDATE', ability: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error updating ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateEnemyReactiveAbility: (enemy: EnemyReactiveAbility): AdminThunkAction<AdminEnemyAbilityUpdate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyReactiveAbilities;
            try {
                const response = await api.update(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_REACTIVE_ABILITY_UPDATE', ability: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error updating ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateEnemyPassiveAbility: (enemy: EnemyPassiveAbility): AdminThunkAction<AdminEnemyAbilityUpdate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyPassiveAbilities;
            try {
                const response = await api.update(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_PASSIVE_ABILITY_UPDATE', ability: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error updating ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deleteEnemyActiveAbility: (enemy: EnemyAbility): AdminThunkAction<AdminEnemyAbilityDelete | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyActiveAbilities;
            try {
                const response = await api.delete(enemy.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_ACTIVE_ABILITY_DELETE', id: enemy.id });
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${enemy.name}.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deleteEnemyReactiveAbility: (enemy: EnemyAbility): AdminThunkAction<AdminEnemyReactiveAbilityDelete | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyReactiveAbilities;
            try {
                const response = await api.delete(enemy.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_REACTIVE_ABILITY_DELETE', id: enemy.id });
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${enemy.name}.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deleteEnemyPassiveAbility: (enemy: EnemyAbility): AdminThunkAction<AdminEnemyPassiveAbilityDelete | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemyPassiveAbilities;
            try {
                const response = await api.delete(enemy.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_PASSIVE_ABILITY_DELETE', id: enemy.id });
                    ToastDispatchables.toast(new SuccessToast(`Successfully deleted ${enemy.name}.`), dispatch);
                }
                else {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${enemy.name}.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },
}