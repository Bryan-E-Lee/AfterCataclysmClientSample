import { Reducer, Action } from 'redux';
import { ItemFilterAction } from './ItemFilter.Actions';
import { ItemFilterDefaultState, ItemFilterState } from './ItemFilter.State';

export const ItemFilterReducer: Reducer<ItemFilterState> = (
    state: ItemFilterState | undefined,
    incomingAction: Action
): ItemFilterState => {
    if (state == undefined) {
        return ItemFilterDefaultState;
    }
    const action = incomingAction as ItemFilterAction;
    switch (action.type) {
        case 'ITEM_FILTER_NAME_SET':
            return { ...state, name: action.name };
        case 'ITEM_FILTER_DESCRIPTION_SET':
            return { ...state, description: action.description };
        case 'ITEM_FILTER_MIN_COST_SET':
            return { ...state, minCost: action.minCost };
        case 'ITEM_FILTER_MAX_COST_SET':
            return { ...state, maxCost: action.maxCost };
        case 'ITEM_FILTER_MIN_WEIGHT_SET':
            return { ...state, minWeight: action.minWeight };
        case 'ITEM_FILTER_MAX_WEIGHT_SET':
            return { ...state, maxWeight: action.maxWeight };
        case 'ITEM_FILTER_TAGS_SET':
            return { ...state, tags: action.tags };
        case 'ITEM_FILTER_CLEAR':
            return { ...ItemFilterDefaultState };
        default:
            return state;
    }
};
