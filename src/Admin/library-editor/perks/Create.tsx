import React, { useState } from "react";
import { DefaultPerkInitializer, PerkInitializer } from "../../../entities/library/perks/Perk";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { PerkInitializerEditor } from "./PerkInitializerEditor";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { useNavigate } from "react-router";

export const PerkCreator = () => {
    const [state, setState] = useState<PerkInitializer>({
        ...DefaultPerkInitializer,
        id: getUniqueIdentifier()
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const create = () => dispatch(AdminLibraryActions.createPerk(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Perk</h1>
            <ThemedButton onClick={create}>Create</ThemedButton>
            <PerkInitializerEditor initializer={state} update={setState} />
            <ThemedButton onClick={create}>Create</ThemedButton>
        </>
    )
}