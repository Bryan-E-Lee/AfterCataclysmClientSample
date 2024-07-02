import React, { useEffect, useState } from "react";
import { DefaultPerkInitializer, PerkInitializer } from "../../../entities/library/perks/Perk";
import { useDispatch, useSelector } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { useParams } from "react-router";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { PerkInitializerEditor } from "./PerkInitializerEditor";

export const PerkEditor = () => {
    const [state, setState] = useState<PerkInitializer>({...DefaultPerkInitializer});

    const perks = useSelector((app: AdminState) => app.library.perks);
    const params = useParams();

    useEffect(() => {
        if (!perks.any()) {
            return;
        }
        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error('Attempt to edit null identified perk.');
        }
        const set = new SortedSet(perks);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown perk with id ${id}`);
        }
        setState({ ...initializer });
    }, [params, perks]);

    const dispatch = useDispatch();
    return (
        <>
            <h1>Edit Perk</h1>
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updatePerk(state))}>Save</ThemedButton>
            <PerkInitializerEditor initializer={state} update={setState} />
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updatePerk(state))}>Save</ThemedButton>
        </>
    )
}