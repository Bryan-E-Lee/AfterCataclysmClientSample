import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { useEffect, useState } from "react";
import { HazardFilter } from "../../../entities/filters/HazardFilter";
import { HazardResults } from "./HazardResults";
import { HazardFiltersComponent } from "./HazardFiltersComponent";
import { HazardViewer } from "./HazardViewer";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { HazardsRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { Route, Routes } from "react-router";
import { Hazard } from "../../../entities/library/hazards/Hazard";
import { ObjectFilterInitializer } from "../../../entities/filters/ObjectFilter";
import { Loader } from "../../theming/loader/Loader";

export const HazardsLibrary = () => {
    const dispatch = useDispatch();
    const { hazards, allHazardsLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allHazardsLoaded) {
            dispatch(LibraryActions.loadHazards());
        }
    }, [dispatch, allHazardsLoaded]);

    const defaultState = new HazardFilter(HazardFilter.GetDefaultInitializer());
    const [filter, setFilter] = useState(defaultState);
    const filteredHazards = filter.filter(hazards);

    return (
        <Routes>
            <Route path=":name" element={<HazardViewer />} />
            <Route path="*" element={<HazardList loaded={allHazardsLoaded} filteredHazards={filteredHazards} onFilter={(filter) => setFilter(new HazardFilter(filter))} />} />
        </Routes>
    )
}

type ListProps = {
    loaded: boolean;
    filteredHazards: Hazard[];
    onFilter: (initializer: ObjectFilterInitializer) => unknown;
}
const HazardList = (props: ListProps) => {
    const { loaded, filteredHazards, onFilter } = props;
    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, HazardsRoute]} />
            <h1>Hazards</h1>
            <HazardFiltersComponent onFilter={onFilter} useRoute />
            {loaded && <HazardResults hazards={filteredHazards} />}
            {!loaded && <Loader>Loading Hazards</Loader>}
        </>
    );
}