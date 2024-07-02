import React, { useEffect, useState } from "react"
import { CreateDefaultScenario, Scenario } from "../../../entities/library/scenarios/Scenario";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { ScenarioBaseEditor } from "./ScenarioBaseEditor";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const ScenarioEditor = () => {
    const dispatch = useDispatch();
    const scenarios = useSelector((app: AdminState) => app.library.scenarios)
    const [state, setState] = useState<Scenario>(CreateDefaultScenario());
    const params = useParams();

    useEffect(() => {
        if (!scenarios.any()) {
            return;
        }

        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified personality.");
        }

        const set = new SortedSet(scenarios);
        const scenario = set.get(id);
        if (scenario == null) {
            throw new Error(`Attempt to edit unknown personality with id ${id}`);
        }
        setState({ ...scenario });
    }, [params, scenarios]);

    const onSave = () => dispatch(AdminLibraryActions.updateScenario(state))
    return (
        <>
            <h1>Edit Scenario</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <ScenarioBaseEditor scenario={state} onUpdate={scenario => setState({ ...scenario })} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    );
}