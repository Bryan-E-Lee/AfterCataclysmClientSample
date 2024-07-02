import React, { useEffect } from "react";
import { SkillEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminSkillsView } from "./AdminSkillsView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminSkills = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadSkills());
    }, [dispatch]);
    return (
        <Routes>
            <Route path=':id/Edit' element={<SkillEditor />} />
            <Route path="*" element={<AdminSkillsView />} />
        </Routes>
    );
}
