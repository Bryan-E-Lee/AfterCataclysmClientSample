import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ModStateSetter } from "./ModStateSetter";
import { AdminLibraryActions } from "../../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton";
import { CrudModInitializer, ModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { DefaultModInitializer } from "../DefaultCrudItems";
import { ModInitializerEditor } from "./ModInitializerEditor";
import { useNavigate } from "react-router";

export const ModCreator = () => {
    const [state, setState] = useState<CrudModInitializer<ModInitializer>>({
        ...DefaultModInitializer
    });

    const stateSetter = new ModStateSetter(setState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSave = () => {
        dispatch(AdminLibraryActions.createMod({ ...state, tags: [...state.tags, ...state.newTags], assignableToTags: [...state.tags, ...state.newAssignableToTags]}, (id: string) => navigate(`${id}/Edit`)));
        const newAssignableToTags = state.newAssignableToTags ?? [];
        dispatch(AdminLibraryActions.addNewTags(newAssignableToTags));
    }

    return (
        <>
            <h1>Create Mod</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <ModInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}