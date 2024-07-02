import React, { useEffect } from "react";
import { EnemyEditor } from "./EnemyEditor";
import { EnemyCreator } from "./EnemyCreator";
import { Route, Routes } from "react-router";
import { AdminEnemiesView } from "./AdminEnemiesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadEnemies());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="Create/*" element={<EnemyCreator />} />
            <Route path=":id/Edit/*" element={<EnemyEditor />} />
            <Route path="*" element={<AdminEnemiesView />} />
        </Routes>
    )
}