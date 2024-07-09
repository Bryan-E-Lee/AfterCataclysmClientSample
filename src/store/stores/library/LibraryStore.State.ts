
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
    booksError: boolean;

    competencies: CompetencyInitializer[];
    allCompetenciesLoaded: boolean;
    competenciesError: boolean;

    conditions: Condition[];
    allConditionsLoaded: boolean;
    conditionsError: boolean;

    hazards: Hazard[];
    allHazardsLoaded: boolean;
    hazardsError: boolean;

    items: ItemInitializer[];
    allItemsLoaded: boolean;
    itemsError: boolean;

    minions: MinionInitializer[];
    allMinionsLoaded: boolean;
    minionsError: boolean;

    perks: PerkInitializer[];
    allPerksLoaded: boolean;
    perksError: boolean;

    personalities: PersonalityInitializer[];
    allPersonalitiesLoaded: boolean;
    personalitiesError: boolean;

    rhetorics: RhetoricInitializer[];
    allRhetoricsLoaded: boolean;
    rhetoricsError: boolean;

    skills: SkillInitializer[];
    allSkillsLoaded: boolean;
    skillsError: boolean;

    tags: string[];
    allTagsLoaded: boolean;
    tagsError: boolean;

    enemies: Enemy[];
    allEnemiesLoaded: boolean;
    enemiesError: boolean;

    enemyActiveAbilities: EnemyActiveAbility[];
    allEnemyActiveAbilitiesLoaded: boolean;
    enemyActiveAbilitiesError: boolean;

    enemyReactiveAbilities: EnemyReactiveAbility[];
    allEnemyReactiveAbilitiesLoaded: boolean;
    enemyReactiveAbilitiesError: boolean;

    enemyPassiveAbilities: EnemyPassiveAbility[];
    allEnemyPassiveAbilitiesLoaded: boolean;
    enemyPassiveAbilitiesError: boolean;
}

export const LibraryDefaultState: LibraryState = {
    books: [],
    allBooksLoaded: false,
    booksError: false,

    competencies: [],
    allCompetenciesLoaded: false,
    competenciesError: false,

    conditions: [],
    allConditionsLoaded: false,
    conditionsError: false,

    hazards: [],
    allHazardsLoaded: false,
    hazardsError: false,

    items: [],
    allItemsLoaded: false,
    itemsError: false,

    minions: [],
    allMinionsLoaded: false,
    minionsError: false,

    perks: [],
    allPerksLoaded: false,
    perksError: false,

    personalities: [],
    allPersonalitiesLoaded: false,
    personalitiesError: false,
    
    rhetorics: [],
    allRhetoricsLoaded: false,
    rhetoricsError: false,

    skills: [],
    allSkillsLoaded: false,
    skillsError: false,

    tags: [],
    allTagsLoaded: false,
    tagsError: false,

    enemies: [],
    allEnemiesLoaded: false,
    enemiesError: false,

    enemyActiveAbilities: [],
    allEnemyActiveAbilitiesLoaded: false,
    enemyActiveAbilitiesError: false,

    enemyReactiveAbilities: [],
    allEnemyReactiveAbilitiesLoaded: false,
    enemyReactiveAbilitiesError: false,

    enemyPassiveAbilities: [],
    allEnemyPassiveAbilitiesLoaded: false,
    enemyPassiveAbilitiesError: false,
};
