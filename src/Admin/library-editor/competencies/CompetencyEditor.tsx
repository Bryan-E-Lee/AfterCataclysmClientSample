import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CompetencyInitializer, DefaultCompetencyInitializer } from "../../../entities/characters/Competencies";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { CompetencyEditorShared } from "./CompetencyInitializerEditor";

export const CompetencyEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<CompetencyInitializer>({ ...DefaultCompetencyInitializer, id: getUniqueIdentifier() });

    const competencies = useSelector((app: AdminState) => app.library.competencies);
    const params = useParams();

    useEffect(() => {
        if (!competencies.any()) {
            return;
        }

        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified competency.');
        }

        const set = new SortedSet(competencies);
        const competency = set.get(id);
        if (competency == null) {
            throw new Error(`Attempt to edit unknown competency with id ${id}.`);
        }
        setState({ ...competency });
    }, [params, competencies]);

    const onSave = () => dispatch(AdminLibraryActions.updateCompetency(state));
    
    return (
        <>
            <h1>Edit Competency</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <CompetencyEditorShared competency={state} update={(competency) => setState({ ...competency })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}