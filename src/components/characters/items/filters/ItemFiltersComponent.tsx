import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { NameFilter } from './NameFilter';
import { ItemDescriptionFilter } from './ItemDescriptionFilter';
import { ItemCostFilter as ItemCostFilters } from './ItemCostFilter';
import { TagsFilter } from './TagsFilter';
import { ItemWeightFilters } from './ItemWeightFilter';
import { ItemTypeFilter } from './ItemTypeFilter';
import { ItemFilterInitializer, ItemFilter } from '../../../../entities/filters/ItemFilter';
import { useDispatch, useSelector } from 'react-redux';
import { SheetActions } from '../../../../store/stores/characters/sheet/actions/Sheet.Actions';
import { ApplicationState } from '../../../../store/stores/ApplicationState';

type Props = {
    useRoute?: boolean;
}

export const ItemFilters = (props: Props) => {
    const { useRoute } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {itemFilter} = useSelector((app: ApplicationState) => app.sheet);

    let initialState: ItemFilterInitializer;
    if (useRoute) {
        const query = new URLSearchParams(location.search);
        initialState = ItemFilter.CreateFilterFromQuery(query).getInitializer();
    }
    else {
        initialState = ItemFilter.GetDefaultInitializer();
    }

    const search = (newState: ItemFilterInitializer) => {
        if(useRoute) {
            const query = new ItemFilter(newState).generateQueryString();
            navigate(query, { replace: true });
        }
        dispatch(SheetActions.filterItems(newState));
    };

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (loaded) {
            return;
        }
        search(initialState);
        setLoaded(true);
    }, [loaded, setLoaded, initialState]);

    return (
        <div className="filters">
            <ItemTypeFilter types={itemFilter.types} onChange={(types) => search({ ...itemFilter, types })} />

            <NameFilter name={itemFilter.name} onChange={name => search({ ...itemFilter, name })} />

            <ItemDescriptionFilter description={itemFilter.description} onChange={description => search({ ...itemFilter, description })} />

            <ItemCostFilters minCost={itemFilter.minCost} maxCost={itemFilter.maxCost}
                onChange={(minCost, maxCost) => search({ ...itemFilter, minCost, maxCost })} />

            <TagsFilter tags={itemFilter.tags} onChange={tags => search({ ...itemFilter, tags })} />

            <ItemWeightFilters minWeight={itemFilter.minWeight} maxWeight={itemFilter.maxWeight}
                onChange={(minWeight, maxWeight) => search({ ...itemFilter, minWeight, maxWeight })} />
        </div>
    )
}