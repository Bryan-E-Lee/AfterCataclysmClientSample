import { LibraryApi } from "../../../apis/library/Api.Library";
import { ApiResponse } from "../../../apis/responses/ApiResponse";
import { AuthorizedRoles } from "../../../config/AuthConfig";
import { Vehicle } from "../../../entities/library/vehicles/Vehicle";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class AdminVehicleApi extends LibraryApi<typeof LibraryApiServerConfig.VehicleApiConfig> {
    public async getAll(): Promise<ApiResponse<Vehicle[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving minions.');
            }

            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getWithIds(ids: string[]): Promise<ApiResponse<Vehicle[]>> {
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

            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async create(minion: Vehicle): Promise<ApiResponse<Vehicle>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(minion)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error creating ${minion.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(minion: Vehicle): Promise<ApiResponse<Vehicle>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: minion.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(minion)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error updating ${minion.name}.`);
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
                throw new Error(`Server error deleting minion.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}