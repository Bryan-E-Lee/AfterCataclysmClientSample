import React from "react";
import { AmmoCreator } from "./Create";
import { AmmoEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminAmmunitionsView } from "./AdminAdmmunitionsView";

export const AdminAmmunitions = () => {
    return (
        <Routes>
            <Route path='Create' element={<AmmoCreator />} />
            <Route path=':id/Edit' element={<AmmoEditor />} />
            <Route path="*" element={<AdminAmmunitionsView />} />
        </Routes>
    );
}
