import React, { useEffect } from "react";
import { ConditionCreator } from "./ConditionCreator";
import { ConditionEditor } from "./ConditionEditor";
import { Route, Routes } from "react-router";
import { AdminConditionsView } from "./AdminConditionsView";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { useDispatch } from "react-redux";

export const AdminConditions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadConditions());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create/*' element={<ConditionCreator />} />
            <Route path=':id/Edit/*' element={<ConditionEditor />} />
            <Route path="*" element={<AdminConditionsView />} />
        </Routes>
    );
}