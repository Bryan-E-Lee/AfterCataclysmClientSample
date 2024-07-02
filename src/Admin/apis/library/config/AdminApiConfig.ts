import { ApiConfig } from "../../../../apis/config/ApiConfig";
import { LibraryApiConfig } from "./LibraryApiConfig";

export const AdminApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Admin',
    actions: {
        updateTagsFromItems: {
            route: '/UpdateTagsFromItems',
            method: 'POST'
        },
        refreshItemsWithMods: {
            route: '/RefreshItemsWithMods',
            method: 'POST'
        },
    }
})