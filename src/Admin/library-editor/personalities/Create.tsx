import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { DefaultPersonalityInitializer, PersonalityInitializer } from "../../../entities/library/socials/Personality";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { PersonalityInitizerEditor } from "./PersonalityInitializerEditor";
import { useNavigate } from "react-router";

export const PersonalityCreator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<PersonalityInitializer>({ ...DefaultPersonalityInitializer, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createPersonality(state, (id: string) => navigate(`${id}/Edit`)));
    
    return (
        <>
            <h1>Create Personality</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <PersonalityInitizerEditor initializer={state} update={(initializer) => setState({ ...initializer })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    );
}