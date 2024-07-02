import { ItemApi } from "../../../../apis/library/Api.Item"
import { TagApi } from "../../../../apis/library/Api.Tag"
import { AdminAmmoApi } from "../../../apis/library/Admin.Api.Ammo"
import { AdminBookApi } from "../../../apis/library/Admin.Api.Book"
import { AdminCompetencyApi } from "../../../apis/library/Admin.Api.Competency"
import { AdminConditionApi } from "../../../apis/library/Admin.Api.Condition"
import { AdminContainerApi } from "../../../apis/library/Admin.Api.Container"
import { AdminEnemyApi } from "../../../apis/library/Admin.Api.Enemy"
import { AdminEnemyActiveAbilityApi } from "../../../apis/library/Admin.Api.EnemyActiveAbility"
import { AdminEnemyPassiveAbilityApi } from "../../../apis/library/Admin.Api.EnemyPassiveAbilityApi"
import { AdminEnemyReactiveAbilityApi } from "../../../apis/library/Admin.Api.EnemyReactiveAbilityApi"
import { AdminHazardApi } from "../../../apis/library/Admin.Api.Hazard"
import { AdminMinionApi } from "../../../apis/library/Admin.Api.Minion"
import { AdminModApi } from "../../../apis/library/Admin.Api.Mod"
import { AdminPerkApi } from "../../../apis/library/Admin.Api.Perk"
import { AdminPersonalityApi } from "../../../apis/library/Admin.Api.Personality"
import { AdminRhetoricApi } from "../../../apis/library/Admin.Api.Rhetoric"
import { AdminScenarioApi } from "../../../apis/library/Admin.Api.Scenario"
import { AdminSkillApi } from "../../../apis/library/Admin.Api.Skill"
import { AdminSpellApi } from "../../../apis/library/Admin.Api.Spell"
import { AdminVehicleApi } from "../../../apis/library/Admin.Api.Vehicle"
import { AdminWeaponApi } from "../../../apis/library/Admin.Api.Weapons"
import { LibraryApiServerConfig } from "../../../apis/library/config/LibraryApiServerConfig"

export interface AdminApiState {
    ammo: AdminAmmoApi,
    books: AdminBookApi,
    competencies: AdminCompetencyApi,
    conditions: AdminConditionApi,
    containers: AdminContainerApi,
    enemies: AdminEnemyApi,
    enemyActiveAbilities: AdminEnemyActiveAbilityApi,
    enemyReactiveAbilities: AdminEnemyReactiveAbilityApi,
    enemyPassiveAbilities: AdminEnemyPassiveAbilityApi,
    hazards: AdminHazardApi,
    items: ItemApi,
    minions: AdminMinionApi,
    mods: AdminModApi,
    perks: AdminPerkApi
    personalities: AdminPersonalityApi,
    rhetorics: AdminRhetoricApi,
    scenarios: AdminScenarioApi,
    skills: AdminSkillApi,
    spells: AdminSpellApi,
    tags: TagApi,
    vehicles: AdminVehicleApi,
    weapons: AdminWeaponApi,
}

export const AdminApiDefaultState: AdminApiState = {
    ammo: new AdminAmmoApi(LibraryApiServerConfig.ItemsApiConfig),
    books: new AdminBookApi(LibraryApiServerConfig.BookApiConfig),
    competencies: new AdminCompetencyApi(LibraryApiServerConfig.CompetencyApiConfig),
    conditions: new AdminConditionApi(LibraryApiServerConfig.ConditionApiConfig),
    containers: new AdminContainerApi(LibraryApiServerConfig.ItemsApiConfig),
    enemies: new AdminEnemyApi(LibraryApiServerConfig.EnemyApiConfig),
    enemyActiveAbilities: new AdminEnemyActiveAbilityApi(LibraryApiServerConfig.EnemyActiveAbilityApiConfig),
    enemyReactiveAbilities: new AdminEnemyReactiveAbilityApi(LibraryApiServerConfig.EnemyReactiveAbilityApiConfig),
    enemyPassiveAbilities: new AdminEnemyPassiveAbilityApi(LibraryApiServerConfig.EnemyPassiveAbilityApiConfig),
    hazards: new AdminHazardApi(LibraryApiServerConfig.HazardApiConfig),
    items: new ItemApi(LibraryApiServerConfig.ItemsApiConfig),
    minions: new AdminMinionApi(LibraryApiServerConfig.MinionsApiConfig),
    mods: new AdminModApi(LibraryApiServerConfig.ItemsApiConfig),
    perks: new AdminPerkApi(LibraryApiServerConfig.PerksApiConfig),
    personalities: new AdminPersonalityApi(LibraryApiServerConfig.PersonalitiesApiConfig),
    rhetorics: new AdminRhetoricApi(LibraryApiServerConfig.RhetoricsApiConfig),
    scenarios: new AdminScenarioApi(LibraryApiServerConfig.ScenarioApiConfig),
    skills: new AdminSkillApi(LibraryApiServerConfig.SkillsApiConfig),
    spells: new AdminSpellApi(LibraryApiServerConfig.ItemsApiConfig),
    tags: new TagApi(LibraryApiServerConfig.TagApiConfig),
    vehicles: new AdminVehicleApi(LibraryApiServerConfig.VehicleApiConfig),
    weapons: new AdminWeaponApi(LibraryApiServerConfig.ItemsApiConfig),
}