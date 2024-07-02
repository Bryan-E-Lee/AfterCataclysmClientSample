import { ApiConfig } from "../../config/ApiConfig";
import { AccountApiConfig } from "./AccountApiConfig";

export const UserApiConfig = new ApiConfig({
    ...AccountApiConfig,
    apiPath: '/api/v1.0/User',
    actions: {
        'get': {
            route: '/',
            method: 'GET'
        },
        'getByIds': {
            route: '/GetUsersByIds',
            method: 'POST'
        },
        'getByName': {
            route: '/{name}',
            method: 'GET'
        },
        'setDisplayName': {
            route: '/SetDisplayName',
            method: 'POST'
        }
    }
})