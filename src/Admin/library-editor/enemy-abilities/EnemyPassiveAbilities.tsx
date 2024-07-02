import React, { useEffect } from "react";
import { EnemyPassiveAbilityCreator } from "./EnemyPassiveAbilityCreator";
import { EnemyPassiveAbilityEditor } from "./EnemyPassiveAbilityEditor";
import { Route, Routes } from "react-router";
import { AdminEnemyPassiveAbilitiesView } from "./AdminEnemyPassiveAbilitiesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemyPassiveAbilities = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadEnemyPassiveAbilities());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="Create" element={<EnemyPassiveAbilityCreator />} />
            <Route path=":id/Edit" element={<EnemyPassiveAbilityEditor />} />
            <Route path="*" element={<AdminEnemyPassiveAbilitiesView />} />
        </Routes>
    )
}