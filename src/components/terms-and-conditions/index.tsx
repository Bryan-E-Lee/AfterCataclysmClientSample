import React from "react";
import { Privacy } from "./Privacy";
import { Route, Routes } from "react-router";

export const TermsAndConditions: React.FC = () => (
    <Routes>
        <Route path="Privacy/*">
            <Privacy />
        </Route>
    </Routes>
)