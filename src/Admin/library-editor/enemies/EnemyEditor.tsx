import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultEnemy, Enemy } from "../../../entities/library/enemies/Enemy";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import React from "react";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { EnemyEditorShared } from "./EnemyEditorShared";

export const EnemyEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<Enemy>({ ...DefaultEnemy, id: getUniqueIdentifier() });

    const {enemies} = useSelector((app: AdminState) => app.library);
    const params = useParams();

    useEffect(() => {
        if (!enemies.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified enemy.");
        }
        const set = new SortedSet(enemies);
        const enemy = set.get(id);
        if (enemy == null) {
            throw new Error(`Attempt to edit unknown enemy with id ${id}.`);
        }
        setState({ ...enemy });
    }, [params, enemies]);

    const onSave = () => dispatch(AdminLibraryActions.updateEnemy(state));

    return (
        <>
            <h1>Edit Enemy</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <EnemyEditorShared enemy={state} update={(enemy) => setState({ ...enemy })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}