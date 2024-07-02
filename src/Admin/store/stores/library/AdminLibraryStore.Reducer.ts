import { Action, Reducer } from 'redux';
import { SortedSet } from '../../../../entities/data-structures/SortedSet';
import { ItemInitializer } from '../../../../entities/library/items/ItemInitializers';
import { MinionInitializer } from '../../../../entities/library/minions/Minion';
import { PerkInitializer } from '../../../../entities/library/perks/Perk';
import { SkillInitializer } from '../../../../entities/library/skills/Skill';
import { PersonalityInitializer } from '../../../../entities/library/socials/Personality';
import { AdminLibraryAction } from './AdminLibraryStore.Actions';
import { AdminLibraryDefaultState, AdminLibraryState } from './AdminLibraryStore.State';
import { Condition } from '../../../../entities/characters/Conditions';
import { CompetencyInitializer } from '../../../../entities/characters/Competencies';
import { RhetoricInitializer } from '../../../../entities/library/socials/Rhetoric';
import { Hazard } from '../../../../entities/library/hazards/Hazard';
import { Enemy } from '../../../../entities/library/enemies/Enemy';
import { EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility } from '../../../../entities/library/enemies/EnemyAbilities';
import { Book } from '../../../../entities/library/books/Book';
import { Scenario } from '../../../../entities/library/scenarios/Scenario';
import { Vehicle } from '../../../../entities/library/vehicles/Vehicle';

export const AdminLibraryReducer: Reducer<AdminLibraryState> = (state: AdminLibraryState | undefined, incomingAction: Action ): AdminLibraryState => {
    if (state == undefined) {
        return AdminLibraryDefaultState;
    }
    const action = incomingAction as AdminLibraryAction;

    let books: SortedSet<Book>;
    let competencies: SortedSet<CompetencyInitializer>;
    let conditions: SortedSet<Condition>;
    let enemies: SortedSet<Enemy>;
    let enemyActiveAbilities: SortedSet<EnemyActiveAbility>;
    let enemyReactiveAbilities: SortedSet<EnemyReactiveAbility>;
    let enemyPassiveAbilities: SortedSet<EnemyPassiveAbility>;
    let hazards: SortedSet<Hazard>;
    let items: SortedSet<ItemInitializer>;
    let minions: SortedSet<MinionInitializer>;
    let perks: SortedSet<PerkInitializer>;
    let personalities: SortedSet<PersonalityInitializer>;
    let rhetorics: SortedSet<RhetoricInitializer>;
    let scenarios: SortedSet<Scenario>;
    let skills: SortedSet<SkillInitializer>;
    let vehicles: SortedSet<Vehicle>;

    switch (action.type) {
        case 'ADMIN_BOOKS_LOADED':
            books = new SortedSet(action.books);
            return { ...state, books: [...books], allBooksLoaded: true };
        case 'ADMIN_BOOK_CREATE':
            books = new SortedSet(state.books);
            books.add(action.book);
            return { ...state, books: [...books] };
        case 'ADMIN_BOOK_UPDATE':
            books = new SortedSet(state.books);
            books.updateByKey(action.book);
            return { ...state, books: [...books] };
        case 'ADMIN_BOOK_DELETE':
            books = new SortedSet(state.books);
            books.removeByKey(action.id);
            return { ...state, books: [...books] };

        case 'ADMIN_COMPETENCIES_LOADED':
            competencies = new SortedSet(action.competencies);
            return { ...state, competencies: [...competencies] };
        case 'ADMIN_COMPETENCY_CREATE':
            competencies = new SortedSet(state.competencies);
            competencies.add(action.competency);
            return { ...state, competencies: [...competencies] };
        case 'ADMIN_COMPETENCY_UPDATE':
            competencies = new SortedSet(state.competencies);
            competencies.updateByKey(action.competency);
            return { ...state, competencies: [...competencies] };
        case 'ADMIN_COMPETENCY_DELETE':
            competencies = new SortedSet(state.competencies);
            competencies.removeByKey(action.id);
            return { ...state, competencies: [...competencies] };


        case 'ADMIN_CONDITIONS_LOADED':
            conditions = new SortedSet(action.conditions);
            return { ...state, conditions: [...conditions], allConditionsLoaded: true };
        case 'ADMIN_CONDITION_CREATE':
            conditions = new SortedSet(state.conditions);
            conditions.add(action.condition);
            return { ...state, conditions: [...conditions] };
        case 'ADMIN_CONDITION_UPDATE':
            conditions = new SortedSet(state.conditions);
            conditions.updateByKey(action.condition);
            return { ...state, conditions: [...conditions ] };
        case 'ADMIN_CONDITION_DELETE':
            conditions = new SortedSet(state.conditions);
            conditions.removeByKey(action.id);
            return { ...state, conditions: [...conditions] };


        case 'ADMIN_ENEMIES_LOADED':
            enemies = new SortedSet(action.enemies);
            return { ...state, enemies: [...enemies], allEnemiesLoaded: true };
        case 'ADMIN_ENEMY_CREATE':
            enemies = new SortedSet(state.enemies);
            enemies.add(action.enemy);
            return { ...state, enemies: [...enemies] };
        case 'ADMIN_ENEMY_UPDATE':
            enemies = new SortedSet(state.enemies);
            enemies.updateByKey(action.enemy);
            return { ...state, enemies: [...enemies] };
        case 'ADMIN_ENEMY_DELETE':
            enemies = new SortedSet(state.enemies);
            enemies.removeByKey(action.id);
            return { ...state, enemies: [...enemies] };

        
        case 'ADMIN_ENEMY_ACTIVE_ABILITIES_LOADED':
            enemyActiveAbilities = new SortedSet(action.abilities);
            return { ...state, enemyActiveAbilities: [...enemyActiveAbilities], allEnemyActiveAbilitiesLoaded: true };
        case 'ADMIN_ENEMY_REACTIVE_ABILITIES_LOADED':
            enemyReactiveAbilities = new SortedSet(action.abilities);
            return { ...state, enemyReactiveAbilities: [...enemyReactiveAbilities], allEnemyReactiveAbilitiesLoaded: true };
        case 'ADMIN_ENEMY_PASSIVE_ABILITIES_LOADED':
            enemyPassiveAbilities = new SortedSet(action.abilities);
            return { ...state, enemyPassiveAbilities: [...enemyPassiveAbilities], allEnemyPassiveAbilitiesLoaded: true };

        case 'ADMIN_ENEMY_ACTIVE_ABILITY_CREATE':
            enemyActiveAbilities = new SortedSet(state.enemyActiveAbilities);
            enemyActiveAbilities.add(action.ability);
            return { ...state, enemyActiveAbilities: [...enemyActiveAbilities] };
        case 'ADMIN_ENEMY_REACTIVE_ABILITY_CREATE':
            enemyReactiveAbilities = new SortedSet(state.enemyReactiveAbilities);
            enemyReactiveAbilities.add(action.ability);
            return { ...state, enemyReactiveAbilities: [...enemyReactiveAbilities] };
        case 'ADMIN_ENEMY_PASSIVE_ABILITY_CREATE':
            enemyPassiveAbilities = new SortedSet(state.enemyPassiveAbilities);
            enemyPassiveAbilities.add(action.ability);
            return { ...state, enemyPassiveAbilities: [...enemyPassiveAbilities] };

        case 'ADMIN_ENEMY_ACTIVE_ABILITY_UPDATE':
            enemyActiveAbilities = new SortedSet(state.enemyActiveAbilities);
            enemyActiveAbilities.update(action.ability);
            return { ...state, enemyActiveAbilities: [...enemyActiveAbilities] };
        case 'ADMIN_ENEMY_REACTIVE_ABILITY_UPDATE':
            enemyReactiveAbilities = new SortedSet(state.enemyReactiveAbilities);
            enemyReactiveAbilities.update(action.ability);
            return { ...state, enemyReactiveAbilities: [...enemyReactiveAbilities] };
        case 'ADMIN_ENEMY_PASSIVE_ABILITY_UPDATE':
            enemyPassiveAbilities = new SortedSet(state.enemyPassiveAbilities);
            enemyPassiveAbilities.update(action.ability);
            return { ...state, enemyPassiveAbilities: [...enemyPassiveAbilities] };

        case 'ADMIN_ENEMY_ACTIVE_ABILITY_DELETE':
            enemyActiveAbilities = new SortedSet(state.enemyActiveAbilities);
            enemyActiveAbilities.removeByKey(action.id);
            return { ...state, enemyActiveAbilities: [...enemyActiveAbilities] };
        case 'ADMIN_ENEMY_REACTIVE_ABILITY_DELETE':
            enemyReactiveAbilities = new SortedSet(state.enemyReactiveAbilities);
            enemyReactiveAbilities.removeByKey(action.id);
            return { ...state, enemyReactiveAbilities: [...enemyReactiveAbilities] };
        case 'ADMIN_ENEMY_PASSIVE_ABILITY_DELETE':
            enemyPassiveAbilities = new SortedSet(state.enemyPassiveAbilities);
            enemyPassiveAbilities.removeByKey(action.id);
            return { ...state, enemyPassiveAbilities: [...enemyPassiveAbilities] };


        case 'ADMIN_HAZARDS_LOADED':
            hazards = new SortedSet(action.hazards);
            return { ...state, hazards: [...hazards] };
        case 'ADMIN_HAZARD_CREATE':
            hazards = new SortedSet(state.hazards);
            hazards.add(action.hazard);
            return { ...state, hazards: [...hazards] };
        case 'ADMIN_HAZARD_UPDATE':
            hazards = new SortedSet(state.hazards);
            hazards.updateByKey(action.hazard);
            return { ...state, hazards: [...hazards] };
        case 'ADMIN_HAZARD_DELETE':
            hazards = new SortedSet(state.hazards);
            hazards.removeByKey(action.id);
            return { ...state, hazards: [...hazards] };


        case 'ADMIN_ITEMS_LOADED':
            items = new SortedSet(action.items);
            return { ...state, items: [...items] };
        case 'ADMIN_ITEMS_CREATE':
            items = new SortedSet(state.items);
            items.add(action.item);
            return { ...state, items: [...items] };
        case 'ADMIN_ITEMS_UPDATE':
            items = new SortedSet(state.items);
            items.updateByKey(action.item);
            return { ...state, items: [...items] };
        case 'ADMIN_ITEMS_DELETE':
            items = new SortedSet(state.items);
            items.removeByKey(action.id);
            return { ...state, items: [...items] };


        case 'ADMIN_MINIONS_LOADED':
            minions = new SortedSet(action.minions);
            return { ...state, minions: [...minions] };
        case 'ADMIN_MINION_CREATE':
            minions = new SortedSet(state.minions);
            minions.add(action.minion);
            return { ...state, minions: [...minions] };
        case 'ADMIN_MINION_UPDATE':
            minions = new SortedSet(state.minions);
            minions.updateByKey(action.minion);
            return { ...state, minions: [...minions] };
        case 'ADMIN_MINION_DELETE':
            minions = new SortedSet(state.minions);
            minions.removeByKey(action.id);
            return { ...state, minions: [...minions] };


        case 'ADMIN_PERKS_LOADED':
            perks = new SortedSet(action.perks);
            return { ...state, perks: [...perks] };
        case 'ADMIN_PERK_CREATE':
            perks = new SortedSet(state.perks);
            perks.add(action.perk);
            return { ...state, perks: [...perks] };
        case 'ADMIN_PERK_UPDATE':
            perks = new SortedSet(state.perks);
            perks.updateByKey(action.perk);
            return { ...state, perks: [...perks] };
        case 'ADMIN_PERK_DELETE':
            perks = new SortedSet(state.perks);
            perks.removeByKey(action.id);
            return { ...state, perks: [...perks] };


        case 'ADMIN_PERSONALITIES_LOADED':
            personalities = new SortedSet(action.personalities);
            return { ...state, personalities: [...personalities] };
        case 'ADMIN_PERSONALITY_CREATE':
            personalities = new SortedSet(state.personalities);
            personalities.add(action.personality);
            return { ...state, personalities: [...personalities] };
        case 'ADMIN_PERSONALITY_UPDATE':
            personalities = new SortedSet(state.personalities);
            personalities.updateByKey(action.personality);
            return { ...state, personalities: [...personalities] };
        case 'ADMIN_PERSONALITY_DELETE':
            personalities = new SortedSet(state.personalities);
            personalities.removeByKey(action.id);
            return { ...state, personalities: [...personalities] };


        case 'ADMIN_RHETORICS_LOADED':
            rhetorics = new SortedSet(action.rhetorics);
            return { ...state, rhetorics: [...rhetorics] };
        case 'ADMIN_RHETORIC_UPDATE':
            rhetorics = new SortedSet(state.rhetorics);
            rhetorics.updateByKey(action.rhetoric);
            return { ...state, rhetorics: [...rhetorics] };


        case 'ADMIN_SCENARIOS_LOADED':
            scenarios = new SortedSet(action.scenarios);
            return { ...state, scenarios: [...scenarios] };
        case 'ADMIN_SCENARIO_CREATE':
            scenarios = new SortedSet(state.scenarios);
            scenarios.add(action.scenario);
            return { ...state, scenarios: [...scenarios] };
        case 'ADMIN_SCENARIO_UPDATE':
            scenarios = new SortedSet(state.scenarios);
            scenarios.update(action.scenario);
            return { ...state, scenarios: [...scenarios] };
        case 'ADMIN_SCENARIO_DELETE':
            scenarios = new SortedSet(state.scenarios);
            scenarios.removeByKey(action.id);
            return { ...state, scenarios: [...scenarios] };
            

        case 'ADMIN_SKILLS_LOADED':
            skills = new SortedSet(action.skills);
            return { ...state, skills: [...skills] };
        case 'ADMIN_SKILL_CREATE':
            skills = new SortedSet(state.skills);
            skills.add(action.skill);
            return { ...state, skills: [...skills] };
        case 'ADMIN_SKILL_UPDATE':
            skills = new SortedSet(state.skills);
            skills.updateByKey(action.skill);
            return { ...state, skills: [...skills] };
        case 'ADMIN_SKILL_DELETE':
            skills = new SortedSet(state.skills);
            skills.removeByKey(action.id);
            return { ...state, skills: [...skills] };


        case 'ADMIN_VEHICLES_LOADED':
            vehicles = new SortedSet(action.vehicles);
            return { ...state, vehicles: [...vehicles], allVehiclesLoaded: true };
        case 'ADMIN_VEHICLE_CREATE':
            vehicles = new SortedSet(state.vehicles);
            vehicles.add(action.vehicle);
            return { ...state, vehicles: [...vehicles] };
        case 'ADMIN_VEHICLE_UPDATE':
            vehicles = new SortedSet(state.vehicles);
            vehicles.update(action.vehicle);
            return { ...state, vehicles: [...vehicles] };
        case 'ADMIN_VEHICLE_DELETE':
            vehicles = new SortedSet(state.vehicles);
            vehicles.removeByKey(action.id);
            return { ...state, vehicles: [...vehicles] };


        case 'LIBRARY_SLOT_TYPES_LOADED':
            return { ...state, slotTypes: action.slotTypes };
        case 'LIBRARY_TAGS_LOADED':
            return { ...state, tags: action.tags };

        default:
            return state;
    }
};
