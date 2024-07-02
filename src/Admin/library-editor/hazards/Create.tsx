import React from "react";
import { useState } from "react"
import { DefaultHazard, Hazard } from "../../../entities/library/hazards/Hazard"
import { getUniqueIdentifier } from "../../../utils/GUID"
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { HazardEditorShared } from "./HazardEditorShared";
import { useNavigate } from "react-router";

export const HazardCreator = () => {
    const [state, setState] = useState<Hazard>({
        ...DefaultHazard,
        id: getUniqueIdentifier()
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onCreate = () => dispatch(AdminLibraryActions.createHazard(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Hazard</h1>
            <ThemedButton onClick={onCreate}>Create</ThemedButton>
            <HazardEditorShared hazard={state} update={(hazard) => setState({ ...hazard })} />
            <ThemedButton onClick={onCreate}>Create</ThemedButton>
        </>
    )
}