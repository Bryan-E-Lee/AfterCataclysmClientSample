import { Skill, SkillInitializer } from "../../../../../entities/library/skills/Skill";
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts";
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions";
import { AdminThunkAction } from "../../AdminState";

type AdminSkillsLoaded = { type: 'ADMIN_SKILLS_LOADED', skills: SkillInitializer[] };
type AdminSkillCreate = { type: 'ADMIN_SKILL_CREATE', skill: SkillInitializer };
type AdminSkillUpdate = { type: 'ADMIN_SKILL_UPDATE', skill: SkillInitializer };
type AdminSkillDelete = { type: 'ADMIN_SKILL_DELETE', id: string };

export type AdminSkillAction = AdminSkillsLoaded | AdminSkillCreate | AdminSkillUpdate | AdminSkillDelete;

export const SkillActions = {
    loadSkills: (): AdminThunkAction<AdminSkillsLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { skills } } = getState();
                const response = await skills.getAll();
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    dispatch({ type: 'ADMIN_SKILLS_LOADED', skills: response.payload });
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createSkill: (initializer: SkillInitializer): AdminThunkAction<AdminSkillCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { skills } } = getState();
                const response = await skills.create(initializer);
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
                    dispatch({ type: 'ADMIN_SKILL_CREATE', skill: response.payload });
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateSkill: (initializer: SkillInitializer): AdminThunkAction<AdminSkillUpdate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { skills } } = getState();
                const response = await skills.update(initializer);
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updated.`), dispatch);
                    dispatch({ type: 'ADMIN_SKILL_UPDATE', skill: response.payload });
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deleteSkill: (skill: SkillInitializer): AdminThunkAction<AdminSkillDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                if (!confirm(`Are you sure you want to delete ${skill.name}?`)) {
                    return;
                }
                
                const { api: { skills } } = getState();
                const response = await skills.delete(skill.id);
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    dispatch({ type: 'ADMIN_SKILL_DELETE', id: skill.id });
                }
                else {
                    ToastDispatchables.toast(new SuccessToast(`${skill.name} deleted.`), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}