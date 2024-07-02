import React from "react";
import { WeaponCreator } from "./Create";
import { WeaponEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminWeaponsView } from "./AdminWeaponsView";

export const AdminWeapons = () => (
    <Routes>
        <Route path='Create' element={<WeaponCreator />} />
        <Route path=':id/Edit' element={<WeaponEditor />} />
        <Route path="*" element={<AdminWeaponsView />} />
    </Routes>
);