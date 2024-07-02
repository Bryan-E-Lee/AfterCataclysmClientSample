import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemedButton } from '../../../../components/inputs/buttons/ThemedButton';
import { CrudItemInitializer, WeaponInitializer } from '../../../../entities/library/items/ItemInitializers';
import { AdminLibraryActions } from '../../../store/stores/library/AdminLibraryStore.Actions';
import { DefaultWeaponInitializer } from '../DefaultCrudItems';
import { WeaponInitializerEditor } from './WeaponInitializerEditor';
import { WeaponStateSetter } from './WeaponStateSetter';
import { useNavigate } from 'react-router';

export const WeaponCreator = () => {
    const [state, setState] = useState<CrudItemInitializer<WeaponInitializer>>({
        ...DefaultWeaponInitializer
    });

    const stateSetter = new WeaponStateSetter(setState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSave = () => {
        dispatch(AdminLibraryActions.createWeapon({ ...state, tags: [...state.tags, ...state.newTags ]}, (id: string) => navigate(`${id}/Edit`)));
        dispatch(AdminLibraryActions.addNewTags(state.newTags));
    }

    return (
        <>
            <h1>Create Weapon</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <WeaponInitializerEditor initializer={state} stateSetter={stateSetter} />
        </>
    )
}
