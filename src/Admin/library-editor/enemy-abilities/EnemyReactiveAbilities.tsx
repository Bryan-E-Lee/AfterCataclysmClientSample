import React, { useEffect } from "react";
import { EnemyReactiveAbilityCreator } from "./EnemyReactiveAbilityCreator";
import { EnemyReactiveAbilityEditor } from "./EnemyReactiveAbilityEditor";
import { Route, Routes } from "react-router";
import { AdminEnemyReactiveAbilitiesView } from "./AdminEnemyReactiveAbilitiesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemyReactiveAbilities = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadEnemyReactiveAbilities());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="Create" element={<EnemyReactiveAbilityCreator />} />
            <Route path=":id/Edit" element={<EnemyReactiveAbilityEditor />} />
            <Route path="*" element={<AdminEnemyReactiveAbilitiesView />} />
        </Routes>
    )
}