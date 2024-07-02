import { ApiConfigActions } from "./ApiConfig";

export const StandardActions: ApiConfigActions = {
    'get': {
        route: '/:id',
        method: 'GET'
    },
    'all': {
        route: '/All',
        method: 'GET'
    },
    'allWithIds': {
        route: '/AllWithIds',
        method: 'POST',
    },
    'allExcept': {
        route: '/AllExcept',
        method: 'POST'
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
};