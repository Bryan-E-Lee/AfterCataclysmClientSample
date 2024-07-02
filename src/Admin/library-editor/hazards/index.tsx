import React, { useEffect } from "react";
import { HazardCreator } from "./Create";
import { HazardEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminHazardsView } from "./AdminHazardsView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminHazards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadHazards());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="Create" element={<HazardCreator />} />
            <Route path=":id/Edit" element={<HazardEditor />} />
            <Route path="*" element={<AdminHazardsView />} />
        </Routes>
    );
}