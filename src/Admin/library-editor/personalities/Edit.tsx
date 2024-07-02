import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { DefaultPersonalityInitializer, PersonalityInitializer } from "../../../entities/library/socials/Personality";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { AdminState } from "../../store/stores/AdminState";
import { PersonalityInitizerEditor } from "./PersonalityInitializerEditor";

export const PersonalityEditor = () => {
    const { personalities } = useSelector((app: AdminState) => app.library);
    const [state, setState] = useState<PersonalityInitializer>({ ...DefaultPersonalityInitializer });
    const params = useParams();

    useEffect(() => {
        if (!personalities.any()) {
            return;
        }

        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified personality.");
        }

        const set = new SortedSet(personalities);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown personality with id ${id}`);
        }
        setState({ ...initializer });
    }, [params, personalities]);

    const dispatch = useDispatch();
    const updateState = (initializer: PersonalityInitializer) => setState({ ...initializer });
    const onSave = () => dispatch(AdminLibraryActions.updatePersonality(state));
    return (
        <>
            <h1>Edit Personality</h1>
            <ThemedButton onClick={onSave}>Save</ThemedButton>
            <PersonalityInitizerEditor initializer={state} update={updateState} />
            <ThemedButton onClick={onSave}>Save</ThemedButton>
        </>
    )
}
