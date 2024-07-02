import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DefaultHazard, Hazard } from "../../../entities/library/hazards/Hazard";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import React from "react";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { HazardEditorShared } from "./HazardEditorShared";

export const HazardEditor = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<Hazard>({ ...DefaultHazard, id: getUniqueIdentifier() });

    const hazards = useSelector((app: AdminState) => app.library.hazards);
    const params = useParams();

    useEffect(() => {
        if (!hazards.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified hazard.');
        }
        const set = new SortedSet(hazards);
        const hazard = set.get(id);
        if (hazard == null) {
            throw new Error(`Attempt to edit unknown hazard with id ${id}.`);
        }
        setState({ ...hazard });
    }, [params, hazards]);

    const onSave = () => dispatch(AdminLibraryActions.updateHazard(state));

    return (
        <>
            <h1>Edit Hazard</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <HazardEditorShared hazard={state} update={(hazard) => setState({ ...hazard })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}