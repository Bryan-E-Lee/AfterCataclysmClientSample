import React from "react";
import { ModCreator } from "./Create";
import { ModEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminModsView } from "./AdminModsView";

export const AdminMods = () => {
    return (
        <Routes>
            <Route path='Create' element={<ModCreator />} />
            <Route path=':id/Edit' element={<ModEditor />} />
            <Route path="*" element={<AdminModsView />} />
        </Routes>
    );
}
