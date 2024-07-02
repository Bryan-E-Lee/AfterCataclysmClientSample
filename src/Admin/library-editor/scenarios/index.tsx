import React, { useEffect } from "react";
import { ScenarioCreator } from "./Create";
import { ScenarioEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminScenariosView } from "./AdminScenariosView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminScenarios = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadScenarios());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create' element={<ScenarioCreator />} />
            <Route path=':id/Edit' element={<ScenarioEditor />} />
            <Route path="*" element={<AdminScenariosView />} />
        </Routes>
    );
}
