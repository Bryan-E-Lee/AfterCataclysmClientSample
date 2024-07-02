import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { DefaultMinionInitializer, MinionInitializer } from "../../../entities/library/minions/Minion";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { MinionInitializerEditor } from "./MinionInitializerEditor";
import { useNavigate } from "react-router";

export const MinionCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<MinionInitializer>({ ...DefaultMinionInitializer, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createMinion(state, (id: string) => navigate(`${id}/Edit`)));

    return (
        <>
            <h1>Create Minion</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <MinionInitializerEditor initializer={state} update={(initializer) => setState({ ...initializer })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    );
}
