import { LibraryApi } from "../../../apis/library/Api.Library";
import { AuthorizedRoles } from "../../../config/AuthConfig";
import { AdminApiConfig } from "./config/AdminApiConfig";

export class AdminApi extends LibraryApi<typeof AdminApiConfig> {
    public async updateTagsFromItems(): Promise<void> {
        try {
            const { uri, method } = this.config.getUriAndMethod('updateTagsFromItems');
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error updating tags from items.');
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async refreshItemsWithMods(): Promise<void> {
        try {
            const { uri, method } = this.config.getUriAndMethod('refreshItemsWithMods');
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error refreshing items with mods.');
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}