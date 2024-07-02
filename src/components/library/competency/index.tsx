import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { CompetencyFiltersComponent } from "./CompetencyFiltersComponent";
import { CompetencyResults } from "./CompetencyResults";
import { CompetencyFilter } from "../../../entities/filters/CompetencyFilter";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { CompetenciesRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { CompetencyViewer } from "./CompetencyViewer";
import { Route, Routes } from "react-router";
import { Loader } from "../../theming/loader/Loader";

export const CompetenciesLibrary = () => {
    const dispatch = useDispatch();
    const { competencies, allCompetenciesLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allCompetenciesLoaded) {
            dispatch(LibraryActions.loadCompetencies());
        }
    }, [dispatch, allCompetenciesLoaded]);

    const defaultState = new CompetencyFilter(CompetencyFilter.GetDefaultInitializer());
    const [filter, setFilter] = useState(defaultState);
    const filteredCompetencies = filter.filter(competencies);

    return (
        <Routes>
            <Route path=":name" element={<CompetencyViewer />} />
            <Route path="*" element={
                <>
                    <Breadcrumbs crumbs={[LibraryRootRoute, CompetenciesRoute]} />
                    <h1>Competencies</h1>
                    <CompetencyFiltersComponent onFilter={initializer => setFilter(new CompetencyFilter(initializer))} useRoute />
                    {allCompetenciesLoaded && <CompetencyResults competencies={filteredCompetencies} />}
                    {!allCompetenciesLoaded && <Loader>Loading Competencies</Loader>}
                </>
            }/>
        </Routes>
    )
}