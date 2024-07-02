import { SkillInitializer } from "../../entities/library/skills/Skill";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class SkillApi extends LibraryApi<typeof LibraryApiServerConfig.SkillApiConfig> {
    public async getAll(): Promise<ApiResponse<SkillInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving skills.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getSkillsWithIds(ids: string[]): Promise<ApiResponse<SkillInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving skills.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) { 
            console.error(e);
            throw e;
        }
    }
}