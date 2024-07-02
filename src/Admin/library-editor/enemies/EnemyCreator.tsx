import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { DefaultEnemy, Enemy } from "../../../entities/library/enemies/Enemy";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { EnemyEditorShared } from "./EnemyEditorShared";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { useNavigate } from "react-router";

export const EnemyCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<Enemy>({ ...DefaultEnemy, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createEnemy(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Enemy</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <EnemyEditorShared enemy={state} update={(enemy) => setState({ ...enemy })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}