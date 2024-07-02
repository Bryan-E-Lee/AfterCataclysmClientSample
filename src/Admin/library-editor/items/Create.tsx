import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { ItemInitializer, CrudItemInitializer } from "../../../entities/library/items/ItemInitializers";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { DefaultItemInitializer } from "./DefaultCrudItems";
import { ItemInitializerEditor } from "./ItemInitializerEditor";
import { ItemStateSetter } from "./ItemStateSetter";
import { useNavigate } from "react-router";

export const ItemCreator = () => {
    const [state, setState] = useState<CrudItemInitializer<ItemInitializer>>({
        ...DefaultItemInitializer,
    });

    const stateSetter = new ItemStateSetter(setState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSave = () => {
        dispatch(AdminLibraryActions.createItem({ ...state, tags: [...state.tags, ...state.newTags] }, (id: string) => navigate(`${id}/Edit`)));
    }

    return (
        <>
            <h1>Create Item</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <ItemInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    );
}
