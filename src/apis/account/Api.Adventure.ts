import * as JsonPatch from 'fast-json-patch';
import { Adventure } from "../../entities/adventures/Adventure";
import { ApiResponse, SuccessApiResponse } from "../responses/ApiResponse";
import { AccountApi } from "./Api.Account";
import { AccountApiServerConfig } from "./config/AccountApiServerConfig";

export class AdventureApi extends AccountApi<typeof AccountApiServerConfig.AdventureApiConfig> {
    /**
     * Gets a adventure.
     * @param adventureId The adventure's unique id.
     * @returns An api response with the requested adventure.
     */
    public async getAdventure(adventureId: string): Promise<ApiResponse<Adventure>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('get', { name: ':id', value: adventureId });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving adventure.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Gets all adventures for a user.
     * @param includeInactive If true, inactive adventures will be included in the request.
     * @returns An api response with all the user's adventures.
     */
    public async getUserAdventures(includeInactive: boolean = false): Promise<ApiResponse<Adventure[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('userAdventures', { name: ':includeInactive', value: includeInactive });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving user adventures.');
            }
            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Creates a new adventure.
     * @returns The newly created adventure.
     */
    public async createAdventure(): Promise<ApiResponse<Adventure>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while creating adventure.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Detects the difference between two version of a adventure and submits a patch request with those changes.
     * @param oldVersion The old version of the adventure. 
     * @param newVersion The new version of the adventure.
     * @returns An updated version of the adventure.
     */
    public async update(oldVersion: Adventure, newVersion: Adventure): Promise<ApiResponse<Adventure>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            return new SuccessApiResponse(oldVersion);
        }

        try {
            const { uri, method } = this.config.getUriAndMethod('update', { name: ':id', value: oldVersion.id });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while updating adventure.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Resets the invitation id for this adventure.
     * @param adventureId The adventure's unique id.
     * @returns The updated invitation id.
     */
    public async resetInvite(adventureId: string): Promise<ApiResponse<string>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('resetInvite', { name: ':id', value: adventureId });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while reseting invite link.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Joins an adventure.
     * @param inviteId The adventure's unique invitation id.
     * @returns The adventure's unique id.
     */
    public async join(inviteId: string): Promise<ApiResponse<string>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('joinAdventure', { name: ':inviteId', value: inviteId });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error joining adventure.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Leaves an adventure.
     * @param id The adventure's unique identifier.
     */
    public async leave(id: string): Promise<ApiResponse<void>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('leaveAdventure', { name: ':id', value: id });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error leaving adventure.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Deactivates an adventure.
     * @param id The adventure's unique identifier.
     */
    public async deactivate(id: string): Promise<ApiResponse<void>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('deactivate', { name: ':id', value: id });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error deactivating adventure.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}