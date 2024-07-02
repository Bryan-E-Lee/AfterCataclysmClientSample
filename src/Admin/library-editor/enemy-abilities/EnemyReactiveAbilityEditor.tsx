import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { EnemyReactiveAbility } from "../../../entities/library/enemies/EnemyAbilities";
import { useState } from "react";
import { DefaultReactiveAbility, ReactiveAbilityCreator } from "../abilities/ReactiveAbilityCreator";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { useParams } from "react-router";
import { AdminState } from "../../store/stores/AdminState";

export const EnemyReactiveAbilityEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<EnemyReactiveAbility>({ ...DefaultReactiveAbility, id: getUniqueIdentifier() });

    const enemyReactiveAbilities = useSelector((app: AdminState) => app.library.enemyReactiveAbilities);
    const params = useParams();

    useEffect(() => {
        if (!enemyReactiveAbilities.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified enemy ability.");
        }
        const set = new SortedSet(enemyReactiveAbilities);
        const ability = set.get(id);
        if (ability == null) {
            throw new Error(`Attempt to edit unknown reactive ability with id ${id}.`);
        }
        setState({ ...ability });
    }, [params, enemyReactiveAbilities]);
    
    const onSave = () => dispatch(AdminLibraryActions.updateEnemyReactiveAbility(state));
    return (
        <>
            <h1>Edit Enemy Reactive Ability</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <ReactiveAbilityCreator reaction={state} onUpdate={(reaction) => setState({ ...(reaction as EnemyReactiveAbility) })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}