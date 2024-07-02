import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { EnemyPassiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { DefaultPassiveAbility, PassiveAbilityCreator } from "../abilities/PassiveAbilityCreator";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { useNavigate } from "react-router";

export const EnemyPassiveAbilityCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<EnemyPassiveAbility>({ ...DefaultPassiveAbility, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createEnemyPassiveAbility(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Enemy Passive Ability</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <PassiveAbilityCreator passive={state} onUpdate={(passive) => setState({ ...(passive as EnemyPassiveAbility)})} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}