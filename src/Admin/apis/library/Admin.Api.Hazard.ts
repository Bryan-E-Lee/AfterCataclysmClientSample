import { LibraryApi } from "../../../apis/library/Api.Library";
import { ApiResponse } from "../../../apis/responses/ApiResponse";
import { AuthorizedRoles } from "../../../config/AuthConfig";
import { Hazard } from "../../../entities/library/hazards/Hazard";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class AdminHazardApi extends LibraryApi<typeof LibraryApiServerConfig.HazardApiConfig> {
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

    public async create(hazard: Hazard): Promise<ApiResponse<Hazard>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(hazard)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error creating ${hazard.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(hazard: Hazard): Promise<ApiResponse<Hazard>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: hazard.id
            });

            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(hazard)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error updating ${hazard.name}.`);
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