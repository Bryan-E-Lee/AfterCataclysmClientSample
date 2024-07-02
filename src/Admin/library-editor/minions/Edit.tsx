import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { DefaultMinionInitializer, MinionInitializer } from "../../../entities/library/minions/Minion";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { MinionInitializerEditor } from "./MinionInitializerEditor";

export const MinionEditor = () => {
    const [state, setState] = useState<MinionInitializer>({ ...DefaultMinionInitializer });

    const minions = useSelector((app: AdminState) => app.library.minions);
    const params = useParams();

    useEffect(() => {
        if (!minions.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified minion.');
        }
        const set = new SortedSet(minions);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown minion with id ${id}`);
        }
        setState({ ...initializer });
    }, [params, minions]);
    
    const dispatch = useDispatch();
    const updateState = (initializer: MinionInitializer) => setState({ ...initializer });
    return (
        <>
            <h1>Edit Minion</h1>
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateMinion(state))}>Save</ThemedButton>
            <MinionInitializerEditor initializer={state} update={updateState} />
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateMinion(state))}>Save</ThemedButton>
        </>
    )
}