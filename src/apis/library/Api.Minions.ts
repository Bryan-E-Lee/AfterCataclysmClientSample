import { MinionInitializer } from "../../entities/library/minions/Minion";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class MinionApi extends LibraryApi<typeof LibraryApiServerConfig.MinionApiConfig> {
    public async getAll(): Promise<ApiResponse<MinionInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving minions.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getMinionInitializersWithIds(ids: string[]): Promise<ApiResponse<MinionInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving minions.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}