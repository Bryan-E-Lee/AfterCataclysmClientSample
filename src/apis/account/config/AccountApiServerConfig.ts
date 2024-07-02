import { AdventureApiConfig } from "./AdventureApiConfig";
import { AdventureHubConfig } from "./AdventureHubConfig";
import { CharactersApiConfig } from "./CharacterApiConfig";
import { UserApiConfig } from "./UserApiConfig";

export const AccountApiServerConfig = Object.seal({
    AdventureApiConfig,
    AdventureHubConfig,
    CharactersApiConfig,
    UserApiConfig,
});