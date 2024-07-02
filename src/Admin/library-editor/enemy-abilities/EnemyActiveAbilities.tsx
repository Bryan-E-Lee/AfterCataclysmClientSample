import React, { useEffect } from "react";
import { EnemyActiveAbilityCreator } from "./EnemyActiveAbilityCreator";
import { EnemyActiveAbilityEditor } from "./EnemyActiveAbilityEditor";
import { Route, Routes } from "react-router";
import { AdminEnemyActiveAbilitiesView } from "./AdminEnemyActiveAbilitiesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemyActiveAbilities = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadEnemyActiveAbilities());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="Create/*" element={<EnemyActiveAbilityCreator />} />
            <Route path=":id/Edit/*" element={<EnemyActiveAbilityEditor />} />
            <Route path="*" element={<AdminEnemyActiveAbilitiesView />} />
        </Routes>
    )
}