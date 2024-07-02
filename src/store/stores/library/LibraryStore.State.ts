
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

export interface LibraryState {
    books: Book[];
    allBooksLoaded: boolean;

    competencies: CompetencyInitializer[];
    allCompetenciesLoaded: boolean;

    conditions: Condition[];
    allConditionsLoaded: boolean;

    hazards: Hazard[];
    allHazardsLoaded: boolean;

    items: ItemInitializer[];
    allItemsLoaded: boolean;
    itemsError: boolean;

    minions: MinionInitializer[];
    allMinionsLoaded: boolean;

    perks: PerkInitializer[];
    allPerksLoaded: boolean;

    personalities: PersonalityInitializer[];
    allPersonalitiesLoaded: boolean;

    rhetorics: RhetoricInitializer[];
    allRhetoricsLoaded: boolean;

    skills: SkillInitializer[];
    allSkillsLoaded: boolean;

    tags: string[];
    allTagsLoaded: boolean;
    tagsError: boolean;

    enemies: Enemy[];
    allEnemiesLoaded: boolean;
    enemyActiveAbilities: EnemyActiveAbility[];
    allEnemyActiveAbilitiesLoaded: boolean;
    enemyReactiveAbilities: EnemyReactiveAbility[];
    allEnemyReactiveAbilitiesLoaded: boolean;
    enemyPassiveAbilities: EnemyPassiveAbility[];
    allEnemyPassiveAbilitiesLoaded: boolean;
}

export const LibraryDefaultState: LibraryState = {
    books: [],
    allBooksLoaded: false,

    competencies: [],
    allCompetenciesLoaded: false,

    conditions: [],
    allConditionsLoaded: false,

    hazards: [],
    allHazardsLoaded: false,

    items: [],
    allItemsLoaded: false,
    itemsError: false,

    minions: [],
    allMinionsLoaded: false,

    perks: [],
    allPerksLoaded: false,

    personalities: [],
    allPersonalitiesLoaded: false,
    
    rhetorics: [],
    allRhetoricsLoaded: false,

    skills: [],
    allSkillsLoaded: false,

    tags: [],
    allTagsLoaded: false,
    tagsError: false,

    enemies: [],
    allEnemiesLoaded: false,

    enemyActiveAbilities: [],
    allEnemyActiveAbilitiesLoaded: false,
    enemyReactiveAbilities: [],
    allEnemyReactiveAbilitiesLoaded: false,
    enemyPassiveAbilities: [],
    allEnemyPassiveAbilitiesLoaded: false,
};
