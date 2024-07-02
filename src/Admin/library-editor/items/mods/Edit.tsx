import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ModInitializerEditor } from "./ModInitializerEditor";
import { ModStateSetter } from "./ModStateSetter";
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../../store/stores/library/AdminLibraryStore.Actions";
import { AdminState } from "../../../store/stores/AdminState";
import { CrudModInitializer, ModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { DefaultModInitializer } from "../DefaultCrudItems";
import { SortedSet } from "../../../../entities/data-structures/SortedSet";

export const ModEditor: React.FC = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<CrudModInitializer<ModInitializer>>({
        ...DefaultModInitializer
    });

    const stateSetter = new ModStateSetter(setState);

    const items = useSelector((app: AdminState) => app.library.items);
    const params = useParams();

    useEffect(() => {
        if (!items.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified mod.');
        }
        const set = new SortedSet(items);
        const initializer = set.get(id) as ModInitializer;
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown mod with id ${id}`);
        }
        setState({ ...initializer, newTags: [], newAssignableToTags: [] });
    }, [params, items]);

    const onSave = () => {
        dispatch(AdminLibraryActions.updateMod({
            ...state,
            tags: [...state.tags, ...state.newTags],
            assignableToTags: [...state.assignableToTags, ...state.newAssignableToTags]
        }));
        dispatch(AdminLibraryActions.addNewTags([...state.newTags, ...state.newAssignableToTags]));
    }

    return (
        <>
            <h1>Edit Mod</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <ModInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    );
}
