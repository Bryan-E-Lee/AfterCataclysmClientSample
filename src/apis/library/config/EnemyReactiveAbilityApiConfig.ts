import { ApiConfig } from "../../config/ApiConfig";
import { StandardActions } from "../../config/StandardActions";
import { LibraryApiConfig } from "./LibraryApiConfig";

export const EnemyReactiveAbilityApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/EnemyReactiveAbility',
    actions: { ...StandardActions }
})