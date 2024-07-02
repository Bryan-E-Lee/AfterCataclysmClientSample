import React, { useEffect } from "react";
import { PersonalityCreator } from "./Create";
import { PersonalityEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminPersonalitiesView } from "./AdminPersonalitiesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminPersonalities = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadPersonalities());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create' element={<PersonalityCreator />} />
            <Route path=':id/Edit' element={<PersonalityEditor />} />
            <Route path="*" element={<AdminPersonalitiesView />} />
        </Routes>
    );
}
