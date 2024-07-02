import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { EnemyActiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { ActiveAbilityCreator, DefaultActiveAbility } from "../abilities/ActiveAbilityCreator";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { useNavigate } from "react-router";

export const EnemyActiveAbilityCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<EnemyActiveAbility>({ ...DefaultActiveAbility, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createEnemyActiveAbility(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Enemy Active Ability</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <ActiveAbilityCreator action={state} onUpdate={(action) => setState({ ...(action as EnemyActiveAbility) })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}