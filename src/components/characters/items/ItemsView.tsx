import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { ItemFilters } from "./filters/ItemFiltersComponent";
import { ItemResults } from "./ItemResults";
import { ItemFilter } from "../../../entities/filters/ItemFilter";
import { Loader } from "../../theming/loader/Loader";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { ErrorNotification } from "../../notifications/Notification";

type Props = {
    useRoute?: boolean;
    close?: () => void;
}

export const ItemsView: React.FC<Props> = (props: Props) => {
    const { useRoute, close } = props;
    const dispatch = useDispatch();
    const { items, allItemsLoaded, itemsError } = useSelector((state: ApplicationState) => state.library);
    const { itemFilter } = useSelector((state: ApplicationState) => state.sheet);

    useEffect(() => {
        if (!allItemsLoaded) {
            dispatch(LibraryActions.loadItems());
        }
    }, [dispatch, allItemsLoaded]);

    const filter = new ItemFilter(itemFilter);
    const filteredItems = filter.filter(items);
    return (
        <>
            {itemsError && <ErrorNotification>There was an error loading items, you can try refreshing the page to reload them.</ErrorNotification>}
            <ItemFilters useRoute={useRoute} />
            {allItemsLoaded && <ItemResults items={filteredItems} close={close} useRoute={useRoute} />}
            {!allItemsLoaded && !itemsError && <Loader>Loading Items...</Loader>}
        </>
    )
}