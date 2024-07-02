import { BookApiConfig } from "./BookApiConfig";
import { CompetencyApiConfig } from "./CompetencyApiConfig";
import { ConditionApiConfig } from "./ConditionApiConfig";
import { EnemyActiveAbilityApiConfig } from "./EnemyActiveAbilityApiConfig";
import { EnemyApiConfig } from "./EnemyApiConfig";
import { EnemyPassiveAbilityApiConfig } from "./EnemyPassiveAbilityApiConfig";
import { EnemyReactiveAbilityApiConfig } from "./EnemyReactiveAbilityApiConfig";
import { HazardApiConfig } from "./HazardApiConfig";
import { ItemApiConfig } from "./ItemApiConfig";
import { MinionApiConfig } from "./MinionApiConfig";
import { PerkApiConfig } from "./PerkApiConfig";
import { PersonalityApiConfig } from "./PersonalityApiConfig";
import { RhetoricApiConfig } from "./RhetoricApiConfig";
import { ScenarioApiConfig } from "./ScenarioApiConfig";
import { SkillApiConfig } from "./SkillApiConfig";
import { TagApiConfig } from "./TagApiConfig";
import { VehicleApiConfig } from "./VehicleApiConfig";

export const LibraryApiServerConfig = Object.seal({
    BookApiConfig,
    CompetencyApiConfig,
    ConditionApiConfig,
    EnemyApiConfig,
    EnemyActiveAbilityApiConfig,
    EnemyReactiveAbilityApiConfig,
    EnemyPassiveAbilityApiConfig,
    HazardApiConfig,
    ItemApiConfig,
    MinionApiConfig,
    PerkApiConfig,
    PersonalityApiConfig,
    RhetoricApiConfig,
    ScenarioApiConfig,
    SkillApiConfig,
    TagApiConfig,
    VehicleApiConfig,
});