import React, { useEffect } from "react";
import { Route, Routes } from "react-router"
import { CreateVehicle } from "./Create";
import { EditVehicle } from "./Edit";
import { AdminVehiclesView } from "./AdminVehiclesView";
import { useDispatch } from "react-redux";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminVehicles = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdminLibraryActions.loadVehicles());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="Create" element={<CreateVehicle />} />
            <Route path=":id/Edit" element={<EditVehicle />} />
            <Route path="*" element={<AdminVehiclesView />} />
        </Routes>
    );
}