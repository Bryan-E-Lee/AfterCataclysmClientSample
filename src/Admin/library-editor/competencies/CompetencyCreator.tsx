import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { CompetencyInitializer, DefaultCompetencyInitializer } from "../../../entities/characters/Competencies";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { CompetencyEditorShared } from "./CompetencyInitializerEditor";
import { useNavigate } from "react-router";

export const CompetencyCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<CompetencyInitializer>({ ...DefaultCompetencyInitializer, id: getUniqueIdentifier() });

    const onSave = () => dispatch(AdminLibraryActions.createCompetency(state, (id: string) => navigate(`/Competencies/${id}/edit`)));
    return (
        <>
            <h1>Create Competency</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <CompetencyEditorShared competency={state} update={(competency) => setState({ ...competency })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}