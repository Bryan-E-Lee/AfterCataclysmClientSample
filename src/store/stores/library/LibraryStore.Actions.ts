import { PascalToCamel, PascalToSnake } from "../../../entities/Utilities";
import { CompetencyInitializer } from "../../../entities/characters/Competencies";
import { Condition } from "../../../entities/characters/Conditions";
import { Book } from "../../../entities/library/books/Book";
import { Enemy } from "../../../entities/library/enemies/Enemy";
import { EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { Hazard } from "../../../entities/library/hazards/Hazard";
import { ItemInitializer } from "../../../entities/library/items/ItemInitializers";
import { MinionInitializer } from "../../../entities/library/minions/Minion";
import { PerkInitializer } from "../../../entities/library/perks/Perk";
import { SkillInitializer } from "../../../entities/library/skills/Skill";
import { PersonalityInitializer } from "../../../entities/library/socials/Personality";
import { RhetoricInitializer } from "../../../entities/library/socials/Rhetoric";
import { ErrorToast } from "../../../entities/toasts/Toasts";
import { AppThunkAction } from "../ApplicationState";
import { ToastAction, ToastDispatchables } from "../toasts/Toasts.Actions";

type LibraryEntityName = "Books"
                        | "Competencies"
                        | "Conditions"
                        | "Hazards"
                        | "Items"
                        | "Minions"
                        | "Perks"
                        | "Personalities"
                        | "Rhetorics"
                        | "Skills"
                        | "Tags"
                        | "Enemies"
                        | "EnemyActiveAbilities"
                        | "EnemyReactiveAbilities"
                        | "EnemyPassiveAbilities";

type LibraryEntityNamesContainer = Record<LibraryEntityName, null>;

type LibraryEntityFromName<T extends LibraryEntityName> = 
    T extends "Books"
    ? Book
    : T extends "Competencies"
    ? CompetencyInitializer
    : T extends "Conditions"
    ? Condition
    : T extends "Hazards"
    ? Hazard
    : T extends "Items"
    ? ItemInitializer
    : T extends "Minions"
    ? MinionInitializer
    : T extends "Perks"
    ? PerkInitializer
    : T extends "Personalities"
    ? PersonalityInitializer
    : T extends "Rhetorics"
    ? RhetoricInitializer
    : T extends "Skills"
    ? SkillInitializer
    : T extends "Tags"
    ? string
    : T extends "Enemies"
    ? Enemy
    : T extends "EnemyActiveAbilities"
    ? EnemyActiveAbility
    : T extends "EnemyReactiveAbilities"
    ? EnemyReactiveAbility
    : T extends "EnemyPassiveAbilities"
    ? EnemyPassiveAbility
    : never;

type EntityLoadTemplate<T extends LibraryEntityName> = {
    type: `LIBRARY_${Uppercase<PascalToSnake<T>>}_LOADED`,
    entities: LibraryEntityFromName<T>[],
    all?: boolean,
};
type EntitiesLoaded<T extends LibraryEntityName> = {
    [k in keyof EntityLoadTemplate<T> as k extends 'entities' ? PascalToCamel<T> : k]: EntityLoadTemplate<T>[k];
}

type LibrarySetEntityError<T extends LibraryEntityName> = { type: `LIBRARY_${Uppercase<PascalToSnake<T>>}_SET_ERROR_STATE` }

type LibraryEntitiesLoadedCollection = {
    [T in keyof LibraryEntityNamesContainer]: EntitiesLoaded<T>;
}

type LibrarySetErrorCollection = {
    [T in keyof LibraryEntityNamesContainer]: LibrarySetEntityError<T>;
}

type EntityKeys = keyof LibraryEntitiesLoadedCollection;

type LibraryEntityAction<T extends EntityKeys> = LibraryEntitiesLoadedCollection[T] | LibrarySetErrorCollection[T];

export type LibraryAction = LibraryEntitiesLoadedCollection[EntityKeys] | LibrarySetErrorCollection[EntityKeys];

export const LibraryActions = {
    loadAdventures: (): AppThunkAction<EntitiesLoaded<"Books"> | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.books;
            const response = await api.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_BOOKS_LOADED', books: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    loadCompetencies: (): AppThunkAction<EntitiesLoaded<"Competencies"> | ToastAction> =>
        async (dispatch, getState) => {
            const competencies = getState().api.competencies;
            const response = await competencies.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_COMPETENCIES_LOADED', competencies: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    loadConditions: (): AppThunkAction<EntitiesLoaded<"Conditions"> | ToastAction> =>
        async (dispatch, getState) => {
            const conditions = getState().api.conditions;
            const response = await conditions.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_CONDITIONS_LOADED', conditions: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    loadHazards: (): AppThunkAction<EntitiesLoaded<"Hazards"> | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.hazards;
            const response = await api.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_HAZARDS_LOADED', hazards: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },
    
    loadItems: (): AppThunkAction<LibraryEntityAction<"Items"> | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const { api: { items } } = getState();
                const response = await items.getItems();
                if (response.status == 'Success') {
                    dispatch({ type: 'LIBRARY_ITEMS_LOADED', items: response.payload, all: true });
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e: unknown) {
                ToastDispatchables.toast(new ErrorToast("Error loading items."), dispatch);
                dispatch({ type: "LIBRARY_ITEMS_SET_ERROR_STATE" });
            }
        },

    loadMinions: (): AppThunkAction<EntitiesLoaded<"Minions"> | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { minions} } = getState();
            const response = await minions.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_MINIONS_LOADED', minions: response.payload, all: true })
            }
        },

    loadPerks: (): AppThunkAction<EntitiesLoaded<"Perks"> | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { perks } } = getState();
            const response = await perks.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_PERKS_LOADED', perks: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    loadPersonalities: (): AppThunkAction<EntitiesLoaded<"Personalities"> | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { personalities } } = getState();
            const response = await personalities.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_PERSONALITIES_LOADED', personalities: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },
    
    loadRhetorics: (): AppThunkAction<EntitiesLoaded<"Rhetorics"> | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { rhetorics } } = getState();
            const response = await rhetorics.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_RHETORICS_LOADED', rhetorics: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    loadSkills: (): AppThunkAction<EntitiesLoaded<"Skills"> | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { skills } } = getState();
            const response = await skills.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_SKILLS_LOADED', skills: response.payload, all: true });
            }
            else {
                const toasts = response.validationResults.map(vr => new ErrorToast(vr.message));
                ToastDispatchables.toastRange(toasts, dispatch);
            }
        },

    loadTags: (): AppThunkAction<LibraryEntityAction<"Tags"> | ToastAction> =>
        async (dispatch, getState) => {
            const { api: { tags } } = getState();
            try {
                const response = await tags.getTags();
                if (response.status == 'Success') {
                    dispatch({ type: 'LIBRARY_TAGS_LOADED', tags: response.payload, all: true });
                }
                else {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
            }
            catch (e: unknown) {
                ToastDispatchables.toast(new ErrorToast("Encountered an error while retrieving tags."), dispatch);
                dispatch({ type: "LIBRARY_TAGS_SET_ERROR_STATE" });
            }
        },

    loadEnemies: (): AppThunkAction<EntitiesLoaded<"Enemies"> | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.enemies;
            const response = await api.getAll();
            if (response.status == 'Success') {
                dispatch({ type: 'LIBRARY_ENEMIES_LOADED', enemies: response.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    loadEnemyAbilities: (): AppThunkAction<EntitiesLoaded<"EnemyActiveAbilities"> | EntitiesLoaded<"EnemyReactiveAbilities"> | EntitiesLoaded<"EnemyPassiveAbilities"> | ToastAction> =>
        async (dispatch, getState) => {
            const { enemyActiveAbilities, enemyReactiveAbilities, enemyPassiveAbilities } = getState().api;
            const [actionsResponse, reactionsResponse, passivesResponse] = await Promise.all([
                enemyActiveAbilities.getAll(),
                enemyReactiveAbilities.getAll(),
                enemyPassiveAbilities.getAll()
            ]);
            if (actionsResponse.status == 'Success') {
                dispatch({ type: 'LIBRARY_ENEMY_ACTIVE_ABILITIES_LOADED', enemyActiveAbilities: actionsResponse.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(actionsResponse.validationResults, dispatch);
            }

            if (reactionsResponse.status == 'Success') {
                dispatch({ type: 'LIBRARY_ENEMY_REACTIVE_ABILITIES_LOADED', enemyReactiveAbilities: reactionsResponse.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(reactionsResponse.validationResults, dispatch);
            }

            if (passivesResponse.status == 'Success') {
                dispatch({ type: 'LIBRARY_ENEMY_PASSIVE_ABILITIES_LOADED', enemyPassiveAbilities: passivesResponse.payload, all: true });
            }
            else {
                ToastDispatchables.toastValidationResults(passivesResponse.validationResults, dispatch);
            }
        },
}