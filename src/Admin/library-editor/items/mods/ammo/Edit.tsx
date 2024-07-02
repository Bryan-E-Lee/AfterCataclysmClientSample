import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AmmoInitializerEditor } from "./AmmoInitializerEditor";
import { AmmoStateSetter } from "./AmmoStateSetter";
import { AdminLibraryActions } from "../../../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../../../components/inputs/buttons/ThemedButton";
import { AmmoInitializer, CrudModInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../../../store/stores/AdminState";
import { DefaultModInitializer } from "../../DefaultCrudItems";
import { SortedSet } from "../../../../../entities/data-structures/SortedSet";


export const AmmoEditor: React.FC = () => {
    const [state, setState] = useState<CrudModInitializer<AmmoInitializer>>({
        ...DefaultModInitializer,
        type: 'Ammo'
    });

    const stateSetter = new AmmoStateSetter(setState);
    const items = useSelector((app: AdminState) => app.library.items);
    const params = useParams();

    useEffect(() => {
        if (!items.any()) {
            return;
        }
        const id = params['id'] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified ammo.');
        }
        const set = new SortedSet(items);
        const initializer = set.get(id) as AmmoInitializer;
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown ammo with id ${id}`);
        }
        setState({ ...initializer, newTags: [], newAssignableToTags: [] });
    }, [params, items]);

    const dispatch = useDispatch();
    const onSave = () => {
        dispatch(AdminLibraryActions.updateAmmo({
            ...state,
            tags: [...state.tags, ...state.newTags],
            assignableToTags: [...state.assignableToTags, ...state.newAssignableToTags]
        }));
        dispatch(AdminLibraryActions.addNewTags([...state.newTags, ...state.newAssignableToTags]));
    }

    return (
        <>
            <h1>Edit Ammo</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <AmmoInitializerEditor initializer={state} stateSetter={stateSetter} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    );
}
