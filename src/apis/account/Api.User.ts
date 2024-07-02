import { UserAccount } from "../../entities/user/UserAccount";
import { ApiResponse } from "../responses/ApiResponse";
import { AccountApi } from "./Api.Account";
import { AccountApiServerConfig } from "./config/AccountApiServerConfig";

export class UserApi extends AccountApi<typeof AccountApiServerConfig.UserApiConfig> {
    /**
     * Retrieves the active user's account info.
     * @returns An api response with the active user's account info, if they have it.
     */
    public async getUserData(): Promise<ApiResponse<UserAccount>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('get');
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving account data.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Retrieves a collection of users by their ids.
     * @param ids The user ids to retrieve.
     * @returns An api response with the requested users' account info.
     */
    public async getUsersByIds(ids: string[]): Promise<ApiResponse<UserAccount[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('getByIds');
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving users.');
            }
            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Attempts to set a user's display name.
     * @param displayName The display name to use.
     * @returns An api response with the user's display name identifier.
     */
    public async setDisplayName(displayName: string): Promise<ApiResponse<string>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('setDisplayName');
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(displayName)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while setting display name.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}