import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { DefaultSkillInitializer, SkillInitializer } from "../../../entities/library/skills/Skill";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { SkillInitializerEditor } from "./SkillInitializerEditor";

export const SkillEditor = () => {
    const [state, setState] = useState<SkillInitializer>({ ...DefaultSkillInitializer });

    const skills = useSelector((app: AdminState) => app.library.skills);
    const params = useParams();

    useEffect(() => {
        if (!skills.any()) {
            return;
        }

        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error(`Attempt to edit null identified skill with id ${id}.`);
        }

        const set = new SortedSet(skills);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown skill with id ${id}.`);
        }
        setState({ ...initializer })
    }, [params, skills]);

    const dispatch = useDispatch();
    const updateState = (initializer: SkillInitializer) => setState({ ...initializer });
    return (
        <>
            <h1>Edit Skill</h1>
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateSkill(state))}>Save</ThemedButton>
            <SkillInitializerEditor initializer={state} update={updateState} />
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateSkill(state))}>Save</ThemedButton>
        </>
    )
}
