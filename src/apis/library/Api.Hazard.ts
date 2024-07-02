import { Hazard } from "../../entities/library/hazards/Hazard";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class HazardApi extends LibraryApi<typeof LibraryApiServerConfig.HazardApiConfig> {
    public async getAll(): Promise<ApiResponse<Hazard[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving hazards.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}