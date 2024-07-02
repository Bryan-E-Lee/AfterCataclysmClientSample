import { PersonalityInitializer } from "../../entities/library/socials/Personality";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class PersonalityApi extends LibraryApi<typeof LibraryApiServerConfig.PersonalityApiConfig> {
    public async getAll(): Promise<ApiResponse<PersonalityInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving personalities.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getPersonalitiesWithIds(ids: string[]): Promise<ApiResponse<PersonalityInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving personalities.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) { 
            console.error(e);
            throw e;
        }
    }
}