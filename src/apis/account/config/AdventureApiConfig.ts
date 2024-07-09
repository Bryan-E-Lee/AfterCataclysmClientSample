import { ApiConfig } from "../../config/ApiConfig";
import { AccountApiConfig } from "./AccountApiConfig";

export const AdventureApiConfig = new ApiConfig({
    ...AccountApiConfig,
    apiPath: '/api/v1.0/Adventure',
    actions: {
        'get': {
            route: '/:id',
            method: 'GET'
        },
        'userAdventures': {
            route: '/GetUserAdventures?includeInactive=:includeInactive',
            method: 'GET'
        },
        'create': {
            route: '/',
            method: 'POST'
        },
        'update': {
            route: '/:id',
            method: 'PATCH'
        },
        'resetInvite': {
            route: '/:id/ResetInvite',
            method: 'POST'
        },
        'joinAdventure': {
            route: '/:inviteId/Join',
            method: 'POST'
        },
        'leaveAdventure': {
            route: '/:id/Leave',
            method: 'DELETE'
        },
        'deactivate': {
            route: '/:id/Deactivate',
            method: 'DELETE'
        },
        'setCommunalDice': {
            route: '/:id/SetCommunalDice',
            method: 'POST'
        },
        'rollCommunalDice': {
            route: '/:id/RollCommunalDice',
            method: 'POST'
        }
    }
})