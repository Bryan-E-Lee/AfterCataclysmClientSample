import { PersonalityInitializer } from "../../../../../entities/library/socials/Personality";
import { SuccessToast, ErrorToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminPersonalitiesLoaded = { type: 'ADMIN_PERSONALITIES_LOADED', personalities: PersonalityInitializer[] };
type AdminPersonalityCreate = { type: 'ADMIN_PERSONALITY_CREATE', personality: PersonalityInitializer };
type AdminPersonalityUpdate = { type: 'ADMIN_PERSONALITY_UPDATE', personality: PersonalityInitializer };
type AdminPersonalityDelete = { type: 'ADMIN_PERSONALITY_DELETE', id: string };

export type AdminPersonalityAction = AdminPersonalitiesLoaded | AdminPersonalityCreate | AdminPersonalityUpdate | AdminPersonalityDelete;

export const PersonalityActions = {
    loadPersonalities: (): AdminThunkAction<AdminPersonalitiesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { personalities } } = getState();
                const response = await personalities.getAll();
                if (response.payload != null) {
                    dispatch({ type: 'ADMIN_PERSONALITIES_LOADED', personalities: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast('Error loading personalities.'), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createPersonality: (initializer: PersonalityInitializer, successCallback: (id: string) => unknown): AdminThunkAction<AdminPersonalityCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { personalities } } = getState();
                const response = await personalities.create(initializer);
                if (response.payload != null) {
                    dispatch({ type: 'ADMIN_PERSONALITY_CREATE', personality: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`${response.payload?.name} created.`), dispatch);
                    successCallback(response.payload.id);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updatePersonality: (initializer: PersonalityInitializer): AdminThunkAction<AdminPersonalityUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { personalities } } = getState();
                const response = await personalities.update(initializer);
                
                if (response.validationResults) {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else if(response.payload) {
                    dispatch({ type: 'ADMIN_PERSONALITY_UPDATE', personality: response.payload });
                    ToastDispatchables.toast(new SuccessToast(`${response.payload?.name} updated.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deletePersonality: (personality: PersonalityInitializer): AdminThunkAction<AdminPersonalityDelete | ToastAction> =>
        async (dispatch, getState) => {
            if (!confirm(`Are you sure you want to delete ${personality.name}?`)) {
                return;
            }

            const { api: { personalities } } = getState();
            try {
                const response = await personalities.delete(personality.id);
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    dispatch({ type: 'ADMIN_PERSONALITY_DELETE', id: personality.id });
                    ToastDispatchables.toast(new SuccessToast(`${personality.name} deleted.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },
}