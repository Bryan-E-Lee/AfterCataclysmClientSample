import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AmmoInitializerEditor } from "./AmmoInitializerEditor";
import { AmmoStateSetter } from "./AmmoStateSetter";
import { ThemedButton } from "../../../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../../../store/stores/library/AdminLibraryStore.Actions";
import { AmmoInitializer, CrudModInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { DefaultModInitializer } from "../../DefaultCrudItems";
import { useNavigate } from "react-router";

export const AmmoCreator = () => {
    const [state, setState] = useState<CrudModInitializer<AmmoInitializer>>({
        ...DefaultModInitializer,
        type: 'Ammo'
    });

    const stateSetter = new AmmoStateSetter(setState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSave = () => {
        dispatch(AdminLibraryActions.createAmmo({ ...state, tags: [...state.tags, ...state.newTags], assignableToTags: [...state.tags, ...state.newAssignableToTags] }, (id: string) => navigate(`${id}/Edit`)));
        const newAssignableToTags = state.newAssignableToTags ?? [];
        dispatch(AdminLibraryActions.addNewTags([...state.newTags, ...newAssignableToTags]));
    }
    return (
        <>
            <h1>Create Ammo</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <AmmoInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}
