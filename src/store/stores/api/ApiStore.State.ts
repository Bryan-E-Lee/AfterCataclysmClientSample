import { AdventureApi } from "../../../apis/account/Api.Adventure"
import { CharacterApi } from "../../../apis/account/Api.Character"
import { UserApi } from "../../../apis/account/Api.User"
import { AccountApiServerConfig } from "../../../apis/account/config/AccountApiServerConfig"
import { AdventureHub } from "../../../apis/account/Hub.Adventure"
import { BookApi } from "../../../apis/library/Api.Book"
import { CompetencyApi } from "../../../apis/library/Api.Competency"
import { ConditionApi } from "../../../apis/library/Api.Condition"
import { EnemyApi } from "../../../apis/library/Api.Enemies"
import { EnemyActiveAbilityApi } from "../../../apis/library/Api.EnemyActiveAbilities"
import { EnemyPassiveAbilityApi } from "../../../apis/library/Api.EnemyPassiveAbilities"
import { EnemyReactiveAbilityApi } from "../../../apis/library/Api.EnemyReactiveAbilities"
import { HazardApi } from "../../../apis/library/Api.Hazard"
import { ItemApi } from "../../../apis/library/Api.Item"
import { MinionApi } from "../../../apis/library/Api.Minions"
import { PerkApi } from "../../../apis/library/Api.Perk"
import { PersonalityApi } from "../../../apis/library/Api.Personality"
import { RhetoricApi } from "../../../apis/library/Api.Rhetoric"
import { SkillApi } from "../../../apis/library/Api.Skill"
import { TagApi } from "../../../apis/library/Api.Tag"
import { LibraryApiServerConfig } from "../../../apis/library/config/LibraryApiServerConfig"
import { CharacterService } from "../../../services/CharacterService"

export interface ApiState {
    //Account
    adventures: AdventureApi,
    adventureHub: AdventureHub,
    characters: CharacterApi,
    users: UserApi,

    //Library
    books: BookApi,
    competencies: CompetencyApi,
    conditions: ConditionApi,
    enemies: EnemyApi,
    enemyActiveAbilities: EnemyActiveAbilityApi,
    enemyReactiveAbilities: EnemyReactiveAbilityApi,
    enemyPassiveAbilities: EnemyPassiveAbilityApi,
    hazards: HazardApi,
    items: ItemApi,
    minions: MinionApi,
    perks: PerkApi,
    personalities: PersonalityApi,
    rhetorics: RhetoricApi,
    skills: SkillApi,
    tags: TagApi,

    characterService: CharacterService,
}

const apis = {
    //Account
    adventures: new AdventureApi(AccountApiServerConfig.AdventureApiConfig),
    adventureHub: new AdventureHub(AccountApiServerConfig.AdventureHubConfig),
    characters: new CharacterApi(AccountApiServerConfig.CharactersApiConfig),
    users: new UserApi(AccountApiServerConfig.UserApiConfig),

    //Library
    books: new BookApi(LibraryApiServerConfig.BookApiConfig),
    competencies: new CompetencyApi(LibraryApiServerConfig.CompetencyApiConfig),
    conditions: new ConditionApi(LibraryApiServerConfig.ConditionApiConfig),
    enemies: new EnemyApi(LibraryApiServerConfig.EnemyApiConfig),
    enemyActiveAbilities: new EnemyActiveAbilityApi(LibraryApiServerConfig.EnemyActiveAbilityApiConfig),
    enemyReactiveAbilities: new EnemyReactiveAbilityApi(LibraryApiServerConfig.EnemyReactiveAbilityApiConfig),
    enemyPassiveAbilities: new EnemyPassiveAbilityApi(LibraryApiServerConfig.EnemyPassiveAbilityApiConfig),
    hazards: new HazardApi(LibraryApiServerConfig.HazardApiConfig),
    items: new ItemApi(LibraryApiServerConfig.ItemApiConfig),
    minions: new MinionApi(LibraryApiServerConfig.MinionApiConfig),
    perks: new PerkApi(LibraryApiServerConfig.PerkApiConfig),
    personalities: new PersonalityApi(LibraryApiServerConfig.PersonalityApiConfig),
    rhetorics: new RhetoricApi(LibraryApiServerConfig.RhetoricApiConfig),
    skills: new SkillApi(LibraryApiServerConfig.SkillApiConfig),
    tags: new TagApi(LibraryApiServerConfig.TagApiConfig)
}
export const ApiDefaultState: ApiState = Object.seal({
    ...apis,
    characterService: new CharacterService(
        apis.characters,
        apis.competencies,
        apis.conditions,
        apis.items,
        apis.minions,
        apis.perks,
        apis.personalities,
        apis.rhetorics,
        apis.skills
    )
});