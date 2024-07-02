import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { ThemedButton } from '../../../../components/inputs/buttons/ThemedButton';
import { SortedSet } from '../../../../entities/data-structures/SortedSet';
import { CrudItemInitializer, WeaponInitializer } from '../../../../entities/library/items/ItemInitializers';
import { AdminState } from '../../../store/stores/AdminState';
import { AdminLibraryActions } from '../../../store/stores/library/AdminLibraryStore.Actions';
import { DefaultWeaponInitializer } from '../DefaultCrudItems';
import { WeaponInitializerEditor } from './WeaponInitializerEditor';
import { WeaponStateSetter } from './WeaponStateSetter';

export const WeaponEditor: React.FC = () => {
    const [state, setState] = useState<CrudItemInitializer<WeaponInitializer>>({
        ...DefaultWeaponInitializer
    });

    const stateSetter = new WeaponStateSetter(setState);
    const items = useSelector((app: AdminState) => app.library.items);
    const params = useParams();

    useEffect(() => {
        if (!items.any()) {
            return;
        }
        const id = params['id'] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified weapon.');
        }
        const set = new SortedSet(items);
        const initializer = set.get(id) as WeaponInitializer;
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown weapon with id ${id}`);
        }
        setState({ ...initializer, newTags: [] });
    }, [params, items]);

    const dispatch = useDispatch();
    const onSave = () => {
        dispatch(AdminLibraryActions.updateWeapon({ ...state, tags: [...state.tags, ...state.newTags] }));
        dispatch(AdminLibraryActions.addNewTags(state.newTags));
    }

    return (
        <>
            <h1>Edit Weapon</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <WeaponInitializerEditor initializer={state} stateSetter={stateSetter} />
        </>
    )
}