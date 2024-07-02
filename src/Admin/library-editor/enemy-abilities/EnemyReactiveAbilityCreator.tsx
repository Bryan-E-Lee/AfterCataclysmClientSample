import React, { useState } from "react"
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton"
import { useDispatch } from "react-redux"
import { EnemyReactiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { DefaultReactiveAbility, ReactiveAbilityCreator } from "../abilities/ReactiveAbilityCreator";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { useNavigate } from "react-router";

export const EnemyReactiveAbilityCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<EnemyReactiveAbility>({ ...DefaultReactiveAbility, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createEnemyReactiveAbility(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Enemy Reactive Ability</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <ReactiveAbilityCreator reaction={state} onUpdate={(reaction) => setState({ ...(reaction as EnemyReactiveAbility) })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}