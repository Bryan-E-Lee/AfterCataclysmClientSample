import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { CreateDefaultScenario, Scenario } from "../../../entities/library/scenarios/Scenario";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ScenarioBaseEditor } from "./ScenarioBaseEditor";
import { useNavigate } from "react-router";


export const ScenarioCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<Scenario>(CreateDefaultScenario());
    const onSave = () => dispatch(AdminLibraryActions.createScenario(state, (id: string) => navigate(`${id}/Edit`)));
    
    return (
        <>
            <h1>Create Sceanrio</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <ScenarioBaseEditor scenario={state} onUpdate={scenario => setState({ ...scenario })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    );
}