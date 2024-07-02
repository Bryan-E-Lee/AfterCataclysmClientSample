import React, { useEffect } from "react";
import { CompetencyCreator } from "./CompetencyCreator";
import { CompetencyEditor } from "./CompetencyEditor";
import { Route, Routes } from "react-router";
import { AdminCompetenciesView } from "./AdminCompetenciesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminCompetencies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadCompetencies());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create/*' element={<CompetencyCreator />} />
            <Route path=':id/Edit/*' element={<CompetencyEditor />} />
            <Route path="*" element={<AdminCompetenciesView />} />
        </Routes>
    )
}