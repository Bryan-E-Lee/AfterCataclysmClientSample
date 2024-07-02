import { EnemyPassiveAbility } from "../../entities/library/enemies/EnemyAbilities";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class EnemyPassiveAbilityApi extends LibraryApi<typeof LibraryApiServerConfig.EnemyPassiveAbilityApiConfig> {
    public async getAll(): Promise<ApiResponse<EnemyPassiveAbility[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('get');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving enemy passives.');
            }

            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}