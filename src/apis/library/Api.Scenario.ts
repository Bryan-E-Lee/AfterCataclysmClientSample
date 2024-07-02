import { Scenario } from "../../entities/library/scenarios/Scenario";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class ScenarioApi extends LibraryApi<typeof LibraryApiServerConfig.ScenarioApiConfig> {
    public async getAll(): Promise<ApiResponse<Scenario[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving scenarios.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getScenariosWithIds(ids: string[]): Promise<ApiResponse<Scenario[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving scenarios.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) { 
            console.error(e);
            throw e;
        }
    }
}