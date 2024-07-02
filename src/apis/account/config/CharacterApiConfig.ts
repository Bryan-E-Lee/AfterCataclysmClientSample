
import { AccountApiConfig } from "./AccountApiConfig";
import { ApiConfig } from "../../config/ApiConfig";

export const CharactersApiConfig = new ApiConfig({
    ...AccountApiConfig,
    apiPath: '/api/v1.0/Characters',
    actions: {
        'all': {
            route: '/',
            method: 'GET'
        },
        'get': {
            route: '/:id',
            method: 'GET'
        },
        'getByIds': {
            route: '/GetByIds',
            method: 'POST'
        },
        'create': {
            route: '/Create',
            method: 'POST'
        },
        'upload': {
            route: '/Upload',
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
        },

        'addCondition': {
            route: '/:id/Conditions',
            method: 'POST'
        },
        'removeCondition': {
            route: '/:id/Conditions/:conditionId',
            method: 'DELETE'
        },

        'updateSkill': {
            route: '/:id/Skills/:skillId',
            method: 'PATCH'
        },

        'updateRhetoric': {
            route: '/:id/Rhetorics/:rhetoricId',
            method: 'PATCH'
        },
        'updateRhetoricPriority': {
            route: '/:id/Rhetorics/:rhetoricId',
            method: 'POST'
        },

        'addPersonality': {
            route: '/:id/Personalities',
            method: 'POST'
        },
        'removePersonality': {
            route: '/:id/Personalities/:personalityId',
            method: 'DELETE'
        },
        
        'addPerk': { 
            route: '/:id/Perks',
            method: 'POST'
        },
        'removePerk': {
            route: '/:id/Perks/:perkId',
            method: 'DELETE'
        },

        'addMinion': {
            route: '/:id/Minions',
            method: 'POST'
        },
        'updateMinion': {
            route: '/:id/Minions/:minionInstanceId',
            method: 'PATCH'
        },
        'removeMinion': {
            route: '/:id/Minions/:minionInstanceId',
            method: 'DELETE'
        },

        'addCompetency': {
            route: '/:id/Competencies/:competencyId',
            method: 'PUT'
        },
        'addCompetencyCustom': {
            route: '/:id/Competencies/Custom',
            method: 'POST'
        },
        'removeCompetency': {
            route: '/:id/Competencies/:competencyId',
            method: 'DELETE'
        },
        'updateCompetency': {
            route: '/:id/Competencies/:competencyId',
            method: 'PATCH'
        },
        'updateCompetencyCustom': {
            route: '/:id/Competencies/:competencyId',
            method: 'PATCH'
        },

        'addItem': {
            route: '/:id/Items',
            method: 'POST'
        },
        'addItemToContainer': {
            route: '/:id/Items?containerInstanceId=:containerInstanceId',
            method: 'POST'
        },
        'addItemRange': {
            route: '/:id/Items/Range',
            method: 'POST'
        },
        'addItemRangeToContainer': {
            route: '/:id/Items/Range?containerInstanceId=:containerInstanceId',
            method: 'POST'
        },
        'updateItem': {
            route: '/:id/Items/:itemInstanceId',
            method: 'PATCH'
        },
        'holdItem': {
            route: '/:id/Held',
            method: 'PUT'
        },
        'wearItem': {
            route: '/:id/Worn',
            method: 'PUT'
        },
        'moveToLoose': {
            route: '/:id/Loose',
            method: 'PUT'
        },
        'removeItem': {
            route: '/:id/Items/:itemInstanceId',
            method: 'DELETE'
        },
        'assignMod': {
            route: '/:id/Items/:itemInstanceId/Mods',
            method: 'POST'
        },
        'assignBodyMod': {
            route: '/:id/Items/AssignBodyMod',
            method: 'POST'
        },
        'addAndAssignMod': {
            route: '/:id/Items/:itemInstanceId/Mods/AddAndAssignMod',
            method: 'POST'
        },
        'addAndAssignBodyMod': {
            route: '/:id/Items/AddAndAssignBodyMod',
            method: 'POST'
        },
        'removeMod': {
            route: '/:id/Items/:itemInstanceId/Mods/:modInstanceId',
            method: 'DELETE'
        },
        'removeBodyMod': {
            route: '/:id/Items/:modInstanceId/RemoveBodyMod',
            method: 'DELETE'
        },
        'addSlots': {
            route: '/:id/Items/AddSlots',
            method: 'POST'
        },
        'removeSlots': {
            route: '/:id/Items/RemoveSlots',
            method: 'POST'
        },
    }
});