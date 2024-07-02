import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { ConditionFiltersComponent } from "./ConditionFiltersComponent";
import { ConditionResults } from "./ConditionResults";
import { ObjectFilter } from "../../../entities/filters/ObjectFilter";
import { ConditionFilter } from "../../../entities/filters/ConditionFilter";
import { ConditionViewer } from "./ConditionViewer";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { ConditionsRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { Route, Routes } from "react-router";
import { Loader } from "../../theming/loader/Loader";

export const ConditionsLibrary = () => {
    const dispatch = useDispatch();
    const { conditions, allConditionsLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allConditionsLoaded) {
            dispatch(LibraryActions.loadConditions());
        }
    }, [dispatch, allConditionsLoaded]);

    const [filter, setFilter] = useState<ConditionFilter>(new ConditionFilter(ObjectFilter.GetDefaultInitializer()));
    const filteredConditions = filter.filter(conditions);

    return (
        <Routes>
            <Route path=":name" element={<ConditionViewer />} />
            <Route path="*" element={
                <>
                    <Breadcrumbs crumbs={[LibraryRootRoute, ConditionsRoute]} />
                    <h1>Conditions</h1>
                    <ConditionFiltersComponent onFilter={(initializer) => setFilter(new ConditionFilter(initializer))} useRoute />
                    {allConditionsLoaded && <ConditionResults conditions={filteredConditions} />}
                    {!allConditionsLoaded && <Loader>Loading Conditions</Loader>}
                </>
            } />
        </Routes>
    )
}