import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { EnemyActiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { useState } from "react";
import { ActiveAbilityCreator, DefaultActiveAbility } from "../abilities/ActiveAbilityCreator";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { SortedSet } from "../../../entities/data-structures/SortedSet";

export const EnemyActiveAbilityEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<EnemyActiveAbility>({ ...DefaultActiveAbility, id: getUniqueIdentifier() });

    const enemyActiveAbilities = useSelector((app: AdminState) => app.library.enemyActiveAbilities);
    const params = useParams();

    useEffect(() => {
        if (!enemyActiveAbilities.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified enemy ability.");
        }
        const set = new SortedSet(enemyActiveAbilities);
        const ability = set.get(id);
        if (ability == null) {
            throw new Error(`Attempt to edit unknown active ability with id ${id}.`);
        }
        setState({ ...ability });
    }, [params, enemyActiveAbilities]);
    
    const onSave = () => dispatch(AdminLibraryActions.updateEnemyActiveAbility(state));
    return (
        <>
            <h1>Edit Enemy Active Ability</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <ActiveAbilityCreator action={state} onUpdate={(action) => setState({ ...(action as EnemyActiveAbility) })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}