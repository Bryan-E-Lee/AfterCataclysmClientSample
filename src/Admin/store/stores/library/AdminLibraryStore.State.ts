import { PersonalityInitializer } from '../../../../entities/library/socials/Personality';
import { SkillInitializer } from '../../../../entities/library/skills/Skill';
import { RhetoricInitializer } from '../../../../entities/library/socials/Rhetoric';
import { PerkInitializer } from '../../../../entities/library/perks/Perk';
import { ItemInitializer } from '../../../../entities/library/items/ItemInitializers';
import { MinionInitializer } from '../../../../entities/library/minions/Minion';
import { Condition } from '../../../../entities/characters/Conditions';
import { CompetencyInitializer } from '../../../../entities/characters/Competencies';
import { Hazard } from '../../../../entities/library/hazards/Hazard';
import { Enemy } from '../../../../entities/library/enemies/Enemy';
import { EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility } from '../../../../entities/library/enemies/EnemyAbilities';
import { Book } from '../../../../entities/library/books/Book';
import { Scenario } from '../../../../entities/library/scenarios/Scenario';
import { Vehicle } from '../../../../entities/library/vehicles/Vehicle';

export interface AdminLibraryState {
    books: Book[];
    allBooksLoaded: boolean;

    competencies: CompetencyInitializer[];

    conditions: Condition[];
    allConditionsLoaded: boolean;
    
    hazards: Hazard[];
    allHazardsLoaded: boolean;

    items: ItemInitializer[];
    minions: MinionInitializer[];
    perks: PerkInitializer[];
    
    personalities: PersonalityInitializer[];
    allPersonalitiesLoaded: boolean;

    rhetorics: RhetoricInitializer[];
    skills: SkillInitializer[];
    slotTypes: string[];
    tags: string[];

    scenarios: Scenario[];
    allScenariosLoaded: boolean;
    
    vehicles: Vehicle[];
    allVehiclesLoaded: boolean;

    enemies: Enemy[];
    allEnemiesLoaded: boolean;

    enemyActiveAbilities: EnemyActiveAbility[];
    allEnemyActiveAbilitiesLoaded: boolean;
    enemyReactiveAbilities: EnemyReactiveAbility[];
    allEnemyReactiveAbilitiesLoaded: boolean;
    enemyPassiveAbilities: EnemyPassiveAbility[];
    allEnemyPassiveAbilitiesLoaded: boolean;
}


export const AdminLibraryDefaultState: AdminLibraryState = {
    books: [],
    allBooksLoaded: false,

    competencies: [],

    conditions: [],
    allConditionsLoaded: false,

    hazards: [],
    allHazardsLoaded: false,
    
    items: [],
    minions: [],
    perks: [],

    personalities: [],
    allPersonalitiesLoaded: false,

    rhetorics: [],
    skills: [],
    slotTypes: [],
    tags: [],
    
    scenarios: [],
    allScenariosLoaded: false,

    vehicles: [],
    allVehiclesLoaded: false,

    enemies: [],
    allEnemiesLoaded: false,

    enemyActiveAbilities: [],
    allEnemyActiveAbilitiesLoaded: false,
    enemyReactiveAbilities: [],
    allEnemyReactiveAbilitiesLoaded: false,
    enemyPassiveAbilities: [],
    allEnemyPassiveAbilitiesLoaded: false,
};
