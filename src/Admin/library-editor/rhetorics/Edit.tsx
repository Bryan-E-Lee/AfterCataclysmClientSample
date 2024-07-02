import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { DefaultRhetoricInitializer, RhetoricInitializer } from "../../../entities/library/socials/Rhetoric";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { AdminState } from "../../store/stores/AdminState";
import { RhetoricInitizerEditor } from "./RhetoricInitializerEditor";

export const RhetoricEditor = () => {
    const { rhetorics } = useSelector((app: AdminState) => app.library);
    const [state, setState] = useState<RhetoricInitializer>({ ...DefaultRhetoricInitializer });
    const params = useParams();

    useEffect(() => {
        if (!rhetorics.any()) {
            return;
        }

        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error("Attempt to edit null identified Rhetoric.");
        }

        const set = new SortedSet(rhetorics);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown Rhetoric with id ${id}`);
        }
        setState({ ...initializer });
    }, [params, rhetorics]);

    const dispatch = useDispatch();
    const updateState = (initializer: RhetoricInitializer) => setState({ ...initializer });

    return (
        <>
            <h1>Edit Rhetoric</h1>
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateRhetoric(state))}>Save</ThemedButton>
            <RhetoricInitizerEditor initializer={state} update={updateState} />
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateRhetoric(state))}>Save</ThemedButton>
        </>
    )
}
