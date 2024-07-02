import { LibraryApi } from "../../../apis/library/Api.Library";
import { ApiResponse } from "../../../apis/responses/ApiResponse";
import { AuthorizedRoles } from "../../../config/AuthConfig";
import { CompetencyInitializer } from "../../../entities/characters/Competencies";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class AdminCompetencyApi extends LibraryApi<typeof LibraryApiServerConfig.CompetencyApiConfig> {
    public async getAll(): Promise<ApiResponse<CompetencyInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving perks.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async create(competency: CompetencyInitializer): Promise<ApiResponse<CompetencyInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(competency)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error creating ${competency.name}.`);
            }
            
            return this.generateResponse(response);
        }
        catch (e){ 
            console.error(e);
            throw e;
        }
    }
    
    public async update(competency: CompetencyInitializer): Promise<ApiResponse<CompetencyInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: competency.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(competency)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error updating ${competency.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async delete(id: string): Promise<ApiResponse<void>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('delete', {
                name: ':id',
                value: id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryDelete);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(token)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error deleting competency.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}