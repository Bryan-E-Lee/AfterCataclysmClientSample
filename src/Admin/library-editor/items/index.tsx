import React, { useEffect } from "react";
import { ItemCreator } from "./Create";
import { ItemEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminItemsView } from "./AdminItemsView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadItems());
    }, [dispatch]);
    return (
        <Routes>
            <Route path='Create' element={<ItemCreator />} />
            <Route path=':id/Edit' element={<ItemEditor />} />
            <Route path="*" element={<AdminItemsView />} />
        </Routes>
    );
}