import { ApiConfig } from "../../config/ApiConfig";
import { LibraryApiConfig } from "./LibraryApiConfig";

export const TagApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Tag',
    actions: {
        'get': {
            route: '',
            method: 'GET'
        },
        'add': {
            route: '',
            method: 'POST'
        },
        'addRange': {
            route: '/AddRange',
            method: 'POST'
        },
        'delete': {
            route: '/:tag/Delete',
            method: 'DELETE'
        },
        'deleteRange': {
            route: '/DeleteRange?tags=:tags',
            method: 'DELETE'
        }
    }
})