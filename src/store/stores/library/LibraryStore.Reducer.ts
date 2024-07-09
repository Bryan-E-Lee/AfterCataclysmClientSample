import { Action, Reducer } from 'redux';
import { SortedSet } from '../../../entities/data-structures/SortedSet';
import { LibraryAction } from './LibraryStore.Actions';
import { LibraryDefaultState, LibraryState } from './LibraryStore.State'; 

export const LibraryReducer: Reducer<LibraryState> = (state: LibraryState | undefined, incomingAction: Action ): LibraryState => {
    if (state == undefined) {
        return LibraryDefaultState;
    }
    const action = incomingAction as LibraryAction;
    switch (action.type) {
        //Books
        case 'LIBRARY_BOOKS_LOADED':
            const books = new SortedSet(state.books);
            books.addOrUpdateRange(...action.books);
            return { ...state, books: [...books], allBooksLoaded: action.all ?? false, booksError: false };

        case 'LIBRARY_BOOKS_SET_ERROR_STATE':
            return { ...state, booksError: true };

        //Competencies
        case 'LIBRARY_COMPETENCIES_LOADED':
            const competencies = new SortedSet(state.competencies);
            competencies.addOrUpdateRange(...action.competencies);
            return { ...state, competencies: [...competencies], allCompetenciesLoaded: action.all ?? false, competenciesError: false };

        case 'LIBRARY_COMPETENCIES_SET_ERROR_STATE':
            return { ...state, competenciesError: true };
            
        //Conditions
        case 'LIBRARY_CONDITIONS_LOADED':
            const conditions = new SortedSet(state.conditions);
            conditions.addOrUpdateRange(...action.conditions);
            return { ...state, conditions: [...conditions], allConditionsLoaded: action.all ?? false, conditionsError: false };

        case 'LIBRARY_CONDITIONS_SET_ERROR_STATE':
            return { ...state, conditionsError: true };

        //Enemies
        case 'LIBRARY_ENEMIES_LOADED':
            const enemies = new SortedSet(state.enemies);
            enemies.addOrUpdateRange(...action.enemies);
            return { ...state, enemies: [...enemies], allEnemiesLoaded: action.all ?? false, enemiesError: false };

        case 'LIBRARY_ENEMIES_SET_ERROR_STATE':
            return { ...state, enemiesError: true }


        //Active Abilities
        case 'LIBRARY_ENEMY_ACTIVE_ABILITIES_LOADED':
            const enemyActiveAbilities = new SortedSet(action.enemyActiveAbilities);
            return { ...state, enemyActiveAbilities: [...enemyActiveAbilities], allEnemyActiveAbilitiesLoaded: action.all ?? false, enemyActiveAbilitiesError: false };

        case 'LIBRARY_ENEMY_ACTIVE_ABILITIES_SET_ERROR_STATE':
            return { ...state, enemyActiveAbilitiesError: true };


        //Reactive Abilities
        case 'LIBRARY_ENEMY_REACTIVE_ABILITIES_LOADED':
            const enemyReactiveAbilities = new SortedSet(action.enemyReactiveAbilities);
            return { ...state, enemyReactiveAbilities: [...enemyReactiveAbilities], allEnemyReactiveAbilitiesLoaded: action.all ?? false, enemyReactiveAbilitiesError: false };

        case 'LIBRARY_ENEMY_REACTIVE_ABILITIES_SET_ERROR_STATE':
            return { ...state, enemyReactiveAbilitiesError: true };


        //Passive Abilities
        case 'LIBRARY_ENEMY_PASSIVE_ABILITIES_LOADED':
            const enemyPassiveAbilities = new SortedSet(action.enemyPassiveAbilities);
            return { ...state, enemyPassiveAbilities: [...enemyPassiveAbilities], allEnemyPassiveAbilitiesLoaded: action.all ?? false, enemyPassiveAbilitiesError: false };

        case 'LIBRARY_ENEMY_PASSIVE_ABILITIES_SET_ERROR_STATE':
            return { ...state, enemyPassiveAbilitiesError: true };


        //Hazards
        case 'LIBRARY_HAZARDS_LOADED':
            const hazards = new SortedSet(state.hazards);
            hazards.addOrUpdateRange(...action.hazards);
            return { ...state, hazards: [...hazards], allHazardsLoaded: action.all ?? false, hazardsError: false };

        case 'LIBRARY_HAZARDS_SET_ERROR_STATE':
            return { ...state, hazardsError: true };


        //Items
        case 'LIBRARY_ITEMS_LOADED':
            const items = new SortedSet(state.items);
            items.addOrUpdateRange(...action.items);
            return { ...state, items: [...items], allItemsLoaded: action.all ?? false, itemsError: false };

        case 'LIBRARY_ITEMS_SET_ERROR_STATE':
            return { ...state, itemsError: true };


        //Minions
        case 'LIBRARY_MINIONS_LOADED':
            const minions = new SortedSet(state.minions);
            minions.addOrUpdateRange(...action.minions);
            return { ...state, minions: [...minions], allMinionsLoaded: action.all ?? false, perksError: false };

        case 'LIBRARY_MINIONS_SET_ERROR_STATE':
            return { ...state, minionsError: true };

        //Perks
        case 'LIBRARY_PERKS_LOADED':
            const perks = new SortedSet(state.perks);
            perks.addOrUpdateRange(...action.perks);
            return { ...state, perks: [...perks], allPerksLoaded: action.all ?? false, perksError: false };

        case 'LIBRARY_PERKS_SET_ERROR_STATE':
            return { ...state, perksError: true };

        //Personalities
        case 'LIBRARY_PERSONALITIES_LOADED':
            const personalities = new SortedSet(state.personalities);
            personalities.addOrUpdateRange(...action.personalities);
            return { ...state, personalities: [...personalities], allPersonalitiesLoaded: action.all ?? false, personalitiesError: false };

        case 'LIBRARY_PERSONALITIES_SET_ERROR_STATE':
            return { ...state, personalitiesError: true };

        //Rhetorics
        case 'LIBRARY_RHETORICS_LOADED':
            const rhetorics = new SortedSet(state.rhetorics);
            rhetorics.addOrUpdateRange(...action.rhetorics);
            return { ...state, rhetorics: [...rhetorics], allRhetoricsLoaded: action.all ?? false, rhetoricsError: false };

        case 'LIBRARY_RHETORICS_SET_ERROR_STATE':
            return { ...state, rhetoricsError: true };


        //Skills
        case 'LIBRARY_SKILLS_LOADED':
            const skills = new SortedSet(state.skills);
            skills.addOrUpdateRange(...action.skills);
            return { ...state, skills: [...skills], allSkillsLoaded: action.all ?? false, skillsError: false };
        
        case 'LIBRARY_SKILLS_SET_ERROR_STATE':
            return { ...state, skillsError: true };


        //Tags
        case 'LIBRARY_TAGS_LOADED':
            const tags = new Set([...state.tags, ...action.tags]);
            return { ...state, tags: [...tags], allTagsLoaded: action.all ?? false, tagsError: false };

        case 'LIBRARY_TAGS_SET_ERROR_STATE':
            return { ...state, tagsError: true };
            
        default:
            return state;
    }
};
