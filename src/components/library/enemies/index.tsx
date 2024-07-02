import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { useEffect, useState } from "react";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { EnemyFilter } from "../../../entities/filters/EnemyFilter";
import { Route, Routes } from "react-router";
import React from "react";
import { EnemyViewer } from "./EnemyViewer";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { EnemiesRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { EnemyResults } from "./EnemyResults";

export const EnemiesLibrary = () => {
    return (
        <Routes>
            <Route path=":name" element={<EnemyViewer />} />
            <Route path="*" element={<EnemyResults />} />
        </Routes>
    )
}
