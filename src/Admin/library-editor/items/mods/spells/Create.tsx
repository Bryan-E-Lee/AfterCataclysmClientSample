import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SpellStateSetter } from "./SpellStateSetter";
import { SpellInitializerEditor } from "./SpellInitializerEditor";
import { AdminLibraryActions } from "../../../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../../../components/inputs/buttons/ThemedButton";
import { CrudModInitializer, SpellInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { DefaultModInitializer } from "../../DefaultCrudItems";
import { useNavigate } from "react-router";

export const SpellCreator = () => {
    const [state, setState] = useState<CrudModInitializer<SpellInitializer>>({
        ...DefaultModInitializer,
        type: 'Spell',
        juice: 0,
        requiresAttention: false
    });

    const stateSetter = new SpellStateSetter(setState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSave = () => {
        dispatch(AdminLibraryActions.createSpell({ ...state, tags: [...state.tags, ...state.newTags], assignableToTags: [...state.tags, ...state.newAssignableToTags] },
            () => navigate("/Library/Spells")));
        const newAssignableToTags = state.newAssignableToTags ?? [];
        dispatch(AdminLibraryActions.addNewTags([...state.newTags, ...newAssignableToTags]));
    };
    return (
        <>
            <h1>Create Spell</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <SpellInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}
