import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUniqueIdentifier } from "../../../utils/GUID";
import { Condition, DefaultCondition } from "../../../entities/characters/Conditions";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { ConditionEditorShared } from "./ConditionEditorShared";
import { AdminState } from "../../store/stores/AdminState";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { useParams } from "react-router";

export const ConditionEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<Condition>({ ...DefaultCondition, id: getUniqueIdentifier() });

    const conditions = useSelector((app: AdminState) => app.library.conditions);
    const params = useParams();

    useEffect(() => {
        if (!conditions.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified condition.');
        }
        const set = new SortedSet(conditions);
        const condition = set.get(id);
        if (condition == null) {
            throw new Error(`Attempt to edit unknown condition with id ${id}.`);
        }
        setState({ ...condition });
    }, [params, conditions]);

    const onSave = () => dispatch(AdminLibraryActions.updateCondition(state));

    return (
        <>
            <h1>Edit Condition</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <ConditionEditorShared condition={state} update={(condition) => setState({ ...condition })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}