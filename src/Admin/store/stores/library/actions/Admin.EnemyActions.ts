import { Enemy } from "../../../../../entities/library/enemies/Enemy";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminEnemiesLoaded = { type: 'ADMIN_ENEMIES_LOADED', enemies: Enemy[] }
type AdminEnemyCreate = { type: 'ADMIN_ENEMY_CREATE', enemy: Enemy }
type AdminEnemyUpdate = { type: 'ADMIN_ENEMY_UPDATE', enemy: Enemy }
type AdminEnemyDelete = { type: 'ADMIN_ENEMY_DELETE', id: string }
export type AdminEnemyAction = AdminEnemiesLoaded | AdminEnemyCreate | AdminEnemyUpdate | AdminEnemyDelete;

export const EnemyActions = {
    loadEnemies: (): AdminThunkAction<AdminEnemiesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemies;
            try {
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMIES_LOADED', enemies: response.payload })
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

    createEnemy: (enemy: Enemy, successCallback: (id: string) => unknown): AdminThunkAction<AdminEnemyCreate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemies;
            try {
                const response = await api.create(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_CREATE', enemy: response.payload });
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

    updateEnemy: (enemy: Enemy): AdminThunkAction<AdminEnemyUpdate | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemies;
            try {
                const response = await api.update(enemy);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_UPDATE', enemy: response.payload });
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

    deleteEnemy: (enemy: Enemy): AdminThunkAction<AdminEnemyDelete | ToastAction> =>
        async (dispatch, getState) => {
            if (!confirm(`Are you sure you want to delete ${enemy.name}?`)) {
                return;
            }
            
            const api = getState().api.enemies;
            try {
                const response = await api.delete(enemy.id);
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_ENEMY_DELETE', id: enemy.id });
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
        }
}