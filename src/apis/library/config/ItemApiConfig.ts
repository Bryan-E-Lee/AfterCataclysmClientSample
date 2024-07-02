import { ApiConfig, ApiConfigActions } from "../../config/ApiConfig";
import { StandardActions } from "../../config/StandardActions";
import { LibraryApiConfig } from "./LibraryApiConfig";

const ExtendedActions: ApiConfigActions = {
    'createWeapon': {
        route: '/CreateWeapon',
        method: 'POST'
    },
    'patchWeapon': {
        route: '/:id/PatchWeapon',
        method: 'PATCH'
    },
    'updateWeapon': {
        route: '/:id/UpdateWeapon',
        method: 'PUT'
    },

    'createContainer': {
        route: '/CreateContainer',
        method: 'POST'
    },
    'patchContainer': {
        route: '/:id/PatchContainer',
        method: 'PATCH'
    },
    'updateContainer': {
        route: '/:id/UpdateContainer',
        method: 'PUT'
    },

    'createMod': {
        route: '/CreateMod',
        method: 'POST'
    },
    'patchMod': {
        route: '/:id/PatchMod',
        method: 'PATCH'
    },
    'updateMod': {
        route: '/:id/UpdateMod',
        method: 'PUT'
    },

    'createAmmo': {
        route: '/CreateAmmo',
        method: 'POST'
    },
    'patchAmmo': {
        route: '/:id/PatchAmmo',
        method: 'PATCH'
    },
    'updateAmmo': {
        route: '/:id/UpdateAmmo',
        method: 'PUT'
    },

    'createSpell': {
        route: '/CreateSpell',
        method: 'POST'
    },
    'patchSpell': {
        route: '/:id/PatchSpell',
        method: 'PATCH'
    },
    'updateSpell': {
        route: '/:id/UpdateSpell',
        method: 'PUT'
    },
};

export const ItemApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Item',
    actions: {
        ...StandardActions,
        ...ExtendedActions
    }
});