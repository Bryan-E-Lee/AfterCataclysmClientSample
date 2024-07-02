import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState"
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions"
import { PersonalityFilter } from "../../../entities/filters/PersonalityFilter"
import { PersonalityFiltersComponent } from "./PersonalityFiltersComponent"
import { PersonalityResults } from "./PersonalityResults"
import { PersonalityViewer } from "./PersonalityViewer"
import { Breadcrumbs } from "../navigation/BreadCrumbs"
import { LibraryRootRoute, PersonalitiesRoute } from "../navigation/LibraryRoutes"
import { Route, Routes } from "react-router"
import { Loader } from "../../theming/loader/Loader"

export const PersonalitiesLibrary = () => {
    const dispatch = useDispatch();
    const { personalities, allPersonalitiesLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allPersonalitiesLoaded) {
            dispatch(LibraryActions.loadPersonalities());
        }
    }, [dispatch, allPersonalitiesLoaded]);

    const [filter, setFilter] = useState<PersonalityFilter>(new PersonalityFilter(PersonalityFilter.GetDefaultInitializer()));
    const filteredPersonalities = filter.filter(personalities);

    return (
        <Routes>
            <Route path=":name" element={<PersonalityViewer />} />
            <Route path="*" element={<>
                <Breadcrumbs crumbs={[LibraryRootRoute, PersonalitiesRoute]} />
                <h1>Personalities</h1>
                <PersonalityFiltersComponent onFilter={(initializer) => setFilter(new PersonalityFilter(initializer))} useRoute />
                {allPersonalitiesLoaded && <PersonalityResults personalities={filteredPersonalities} />}
                {!allPersonalitiesLoaded && <Loader>Loading Personalities</Loader>}
            </>} />                
        </Routes>
    )
}