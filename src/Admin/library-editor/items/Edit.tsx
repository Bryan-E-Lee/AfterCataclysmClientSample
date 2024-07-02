import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { ItemInitializer, CrudItemInitializer } from "../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { DefaultItemInitializer } from "./DefaultCrudItems";
import { ItemInitializerEditor } from "./ItemInitializerEditor";
import { ItemStateSetter } from "./ItemStateSetter";

export const ItemEditor = () => {
    const [state, setState] = useState<CrudItemInitializer<ItemInitializer>>({
        ...DefaultItemInitializer
    });

    const stateSetter = new ItemStateSetter(setState);
    const items = useSelector((app: AdminState) => app.library.items);
    const params = useParams();

    useEffect(() => {
        if (!items.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified item.');
        }
        const set = new SortedSet(items);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown item with id ${id}`);
        }
        setState({ ...initializer, newTags: [] });
    }, [params, items]);

    const dispatch = useDispatch();
    const onSave = () => {
        dispatch(AdminLibraryActions.updateItem({ ...state, tags: [...state.tags, ...state.newTags] }));
    }

    return (
        <>
            <h1>Edit Item</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <ItemInitializerEditor initializer={state} stateSetter={stateSetter} />
        </>
    )
}