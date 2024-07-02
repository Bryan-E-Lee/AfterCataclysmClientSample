import React, { useEffect } from "react";
import { PerkCreator } from "./Create";
import { PerkEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminPerksView } from "./AdminPerksView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminPerks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadPerks());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create' element={<PerkCreator />} />
            <Route path=':id/Edit' element={<PerkEditor />} />
            <Route path="*" element={<AdminPerksView />} />
        </Routes>
    );
}
