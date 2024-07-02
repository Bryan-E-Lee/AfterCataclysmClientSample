import React from "react";
import { SpellCreator } from "./Create";
import { SpellEditor } from "./Edit";
import { Route, Routes } from "react-router";
import { AdminSpellsView } from "./AdminSpellsView";

export const AdminSpells = () => {
    return (
        <Routes>
            <Route path='Create' element={<SpellCreator />} />
            <Route path=':id/Edit' element={<SpellEditor />} />
            <Route path="*" element={<AdminSpellsView />} />
        </Routes>
     );
}
