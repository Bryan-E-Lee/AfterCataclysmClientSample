import { EnemyReactiveAbility } from "../../entities/library/enemies/EnemyAbilities";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class EnemyReactiveAbilityApi extends LibraryApi<typeof LibraryApiServerConfig.EnemyReactiveAbilityApiConfig> {
    public async getAll(): Promise<ApiResponse<EnemyReactiveAbility[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('get');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving enemy reactions.');
            }

            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}