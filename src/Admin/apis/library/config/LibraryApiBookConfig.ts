import { ApiConfig } from "../../../../apis/config/ApiConfig";
import { LibraryApiConfig } from "./LibraryApiConfig";

export const BookApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Book',
    actions: {
        'all': {
            route: '/All',
            method: 'GET'
        },
        'get': {
            route: '/',
            method: 'GET'
        },
        'create': {
            route: '/Create',
            method: 'POST'
        },
        'update': {
            route: '/:id',
            method: 'PUT'
        },
        'patch': {
            route: '/:id',
            method: 'PATCH'
        },
        'delete': {
            route: '/:id',
            method: 'DELETE'
        }
    }
});