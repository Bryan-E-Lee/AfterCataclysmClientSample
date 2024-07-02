import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EnemyPassiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { DefaultPassiveAbility, PassiveAbilityCreator } from "../abilities/PassiveAbilityCreator";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { useParams } from "react-router";
import { AdminState } from "../../store/stores/AdminState";

export const EnemyPassiveAbilityEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<EnemyPassiveAbility>({ ...DefaultPassiveAbility, id: getUniqueIdentifier() });

    const enemyPassiveAbilities = useSelector((app: AdminState) => app.library.enemyPassiveAbilities);
    const params = useParams();

    useEffect(() => {
        if (!enemyPassiveAbilities.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified enemy ability.");
        }
        const set = new SortedSet(enemyPassiveAbilities);
        const ability = set.get(id);
        if (ability == null) {
            throw new Error(`Attempt to edit unknown passive ability with id ${id}.`);
        }
        setState({ ...ability });
    }, [params, enemyPassiveAbilities]);
    
    const onSave = () => dispatch(AdminLibraryActions.updateEnemyPassiveAbility(state));
    return (
        <>
            <h1>Edit Enemy Passive Ability</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <PassiveAbilityCreator passive={state} onUpdate={(passive) => setState({ ...(passive as EnemyPassiveAbility) })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}