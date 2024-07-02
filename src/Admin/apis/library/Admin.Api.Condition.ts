import { LibraryApi } from "../../../apis/library/Api.Library";
import { ApiResponse } from "../../../apis/responses/ApiResponse";
import { AuthorizedRoles } from "../../../config/AuthConfig";
import { Condition } from "../../../entities/characters/Conditions";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class AdminConditionApi extends LibraryApi<typeof LibraryApiServerConfig.ConditionApiConfig> {
    public async getAll(): Promise<ApiResponse<Condition[]>> {
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

    public async create(condition: Condition): Promise<ApiResponse<Condition>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(condition)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error creating ${condition.name}.`);
            }
            
            return this.generateResponse(response);
        }
        catch (e) { 
            console.error(e);
            throw e;
        }
    }
    
    public async update(condition: Condition): Promise<ApiResponse<Condition>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: condition.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(condition)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error updating ${condition.name}.`);
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
                throw new Error(`Server error deleting condition.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}