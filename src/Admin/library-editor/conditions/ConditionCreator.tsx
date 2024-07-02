import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { getUniqueIdentifier } from "../../../utils/GUID";
import { Condition, DefaultCondition } from "../../../entities/characters/Conditions";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { ConditionEditorShared } from "./ConditionEditorShared";
import { useNavigate } from "react-router";

export const ConditionCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<Condition>({ ...DefaultCondition, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createCondition(state, (id: string) => navigate(`/Conditions/${id}/Edit`)));

    return (
        <>
            <h1>Create Condition</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <ConditionEditorShared condition={state} update={(condition) => setState({ ...condition })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}