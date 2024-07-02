import React, { useEffect } from "react";
import { MinionCreator } from "./Create";
import { MinionEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminMinionsView } from "./AdminMinionsView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminMinions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadMinions());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create' element={<MinionCreator />} />
            <Route path=':id/Edit' element={<MinionEditor />} />
            <Route path="*" element={<AdminMinionsView />} />
        </Routes>
    );
}
