import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { SpellInitializerEditor } from "./SpellInitializerEditor";
import { SpellStateSetter } from "./SpellStateSetter";
import { AdminLibraryActions } from "../../../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../../../store/stores/AdminState";
import { CrudModInitializer, SpellInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { DefaultModInitializer } from "../../DefaultCrudItems";
import { SortedSet } from "../../../../../entities/data-structures/SortedSet";

export const SpellEditor = () => {
    const [state, setState] = useState<CrudModInitializer<SpellInitializer>>({
        ...DefaultModInitializer,
        type: 'Spell',
        juice: 0,
        requiresAttention: false
    });

    const stateSetter = new SpellStateSetter(setState);
    const items = useSelector((app: AdminState) => app.library.items);
    const params = useParams();

    useEffect(() => {
        if (!items.any()) {
            return;
        }
        const id = params['id'] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified spell.');
        }
        const set = new SortedSet(items);
        const initializer = set.get(id) as SpellInitializer;
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown spell with id ${id}`);
        }
        setState({ ...initializer, newTags: [], newAssignableToTags: [] });
    }, [params, items]);

    const dispatch = useDispatch();
    const onSave = () => {
        dispatch(AdminLibraryActions.updateSpell({
            ...state,
            tags: [...state.tags, ...state.newTags],
            assignableToTags: [...state.assignableToTags, ...state.newAssignableToTags]
        }));
        dispatch(AdminLibraryActions.addNewTags([...state.newTags, ...state.newAssignableToTags]));
    }

    return (
        <>
            <h1>Edit Spell</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <SpellInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}
