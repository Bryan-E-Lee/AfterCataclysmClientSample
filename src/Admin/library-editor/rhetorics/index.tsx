import React, { useEffect } from "react";
import { RhetoricEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminRhetoricsView } from "./AdminRhetoricsView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminRhetorics = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadRhetorics());
    }, [dispatch]);
    return (
        <Routes>
            <Route path=':id/Edit' element={<RhetoricEditor />} />
            <Route path="*" element={<AdminRhetoricsView />} />
        </Routes>
    );
}
