import { AppThunkAction } from '../../ApplicationState';

type SetItemFilterName = {
    type: 'ITEM_FILTER_NAME_SET';
    name: string;
}
type SetItemFilterDescription = {
    type: 'ITEM_FILTER_DESCRIPTION_SET';
    description: string;
}
type SetItemFilterMinCost = {
    type: 'ITEM_FILTER_MIN_COST_SET';
    minCost: number;
}
type SetItemFilterMaxCost = {
    type: 'ITEM_FILTER_MAX_COST_SET';
    maxCost: number;
}
type SetItemFilterMinWeight = {
    type: 'ITEM_FILTER_MIN_WEIGHT_SET';
    minWeight: number;
}
type SetItemFilterMaxWeight = {
    type: 'ITEM_FILTER_MAX_WEIGHT_SET';
    maxWeight: number;
}
type SetItemFilterTags = {
    type: 'ITEM_FILTER_TAGS_SET';
    tags: string[];
}
type ClearItemFilter = {
    type: 'ITEM_FILTER_CLEAR';
}

export type ItemFilterAction =
    | SetItemFilterName
    | SetItemFilterDescription
    | SetItemFilterMinCost
    | SetItemFilterMaxCost
    | SetItemFilterMinWeight
    | SetItemFilterMaxWeight
    | SetItemFilterTags
    | ClearItemFilter;

export const ItemFilterActions = {
    setItemFilterName: (name: string): AppThunkAction<SetItemFilterName> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_NAME_SET', name });
        },

    setItemFilterDescription: (description: string): AppThunkAction<SetItemFilterDescription> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_DESCRIPTION_SET', description });
        },

    setItemFilterMinCost: (minCost: number): AppThunkAction<SetItemFilterMinCost> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_MIN_COST_SET', minCost });
        },

    setItemFilterMaxCost: (maxCost: number): AppThunkAction<SetItemFilterMaxCost> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_MAX_COST_SET', maxCost });
        },

    setItemFilterMinWeight: (minWeight: number): AppThunkAction<SetItemFilterMinWeight> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_MIN_WEIGHT_SET', minWeight });
        },

    setItemFilterMaxWeight: (maxWeight: number): AppThunkAction<SetItemFilterMaxWeight> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_MAX_WEIGHT_SET', maxWeight });
        },

    setItemFilterTags: (tags: string[]): AppThunkAction<SetItemFilterTags> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_TAGS_SET', tags });
        },

    clearItemFilter: (): AppThunkAction<ClearItemFilter> =>
        async (dispatch, getState) => {
            dispatch({ type: 'ITEM_FILTER_CLEAR' });
        },
};
