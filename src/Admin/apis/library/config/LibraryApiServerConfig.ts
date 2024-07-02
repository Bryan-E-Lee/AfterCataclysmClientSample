import { EnemyActiveAbilityApiConfig } from '../../../../apis/library/config/EnemyActiveAbilityApiConfig';
import { EnemyApiConfig } from '../../../../apis/library/config/EnemyApiConfig';
import { EnemyPassiveAbilityApiConfig } from '../../../../apis/library/config/EnemyPassiveAbilityApiConfig';
import { EnemyReactiveAbilityApiConfig } from '../../../../apis/library/config/EnemyReactiveAbilityApiConfig';
import { ScenarioApiConfig } from '../../../../apis/library/config/ScenarioApiConfig';
import { ItemsApiConfig } from './ItemApiConfig';
import { BookApiConfig } from './LibraryApiBookConfig';
import { CompetencyApiConfig } from './LibraryApiCompetencyConfig';
import { ConditionApiConfig } from './LibraryApiConditionConfig';
import { HazardApiConfig } from './LibraryApiHazardConfig';
import { MinionsApiConfig } from './MinionApiServerConfig';
import { PerksApiConfig } from './PerkApiConfig';
import { PersonalitiesApiConfig } from './PersonalityApiConfig';
import { RhetoricsApiConfig } from './RhetoricApiConfig';
import { SkillsApiConfig } from './SkillApiConfig';
import { TagApiConfig } from './TagApiConfig';
import { VehicleApiConfig } from './VehicleApiConfig';

export const LibraryApiServerConfig = Object.seal({
    BookApiConfig,
    CompetencyApiConfig,
    ConditionApiConfig,
    EnemyApiConfig,
    EnemyActiveAbilityApiConfig,
    EnemyReactiveAbilityApiConfig,
    EnemyPassiveAbilityApiConfig,
    HazardApiConfig,
    ItemsApiConfig,
    MinionsApiConfig,
    PerksApiConfig,
    PersonalitiesApiConfig,
    RhetoricsApiConfig,
    ScenarioApiConfig,
    SkillsApiConfig,
    TagApiConfig,
    VehicleApiConfig,
});
