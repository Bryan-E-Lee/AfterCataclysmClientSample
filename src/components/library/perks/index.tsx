import React, { useEffect, useState } from "react"
import { PerkFiltersComponent } from "./PerkFiltersComponent"
import { PerkFilter } from "../../../entities/filters/PerkFilter"
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState"
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions"
import { PerkResults } from "./PerkResults"
import { Breadcrumbs } from "../navigation/BreadCrumbs"
import { LibraryRootRoute, PerksRoute } from "../navigation/LibraryRoutes"
import { PerkViewer } from "./PerkViewer"
import { Route, Routes } from "react-router"
import { Loader } from "../../theming/loader/Loader"

export const PerksLibrary = () => {
    const dispatch = useDispatch();
    const { perks, allPerksLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allPerksLoaded) {
            dispatch(LibraryActions.loadPerks());
        }
    }, [dispatch, allPerksLoaded]);

    const [filter, setFilter] = useState<PerkFilter>(new PerkFilter(PerkFilter.GetDefaultInitializer()));
    const filteredPerks = filter.filterPerks(perks);

    return (
        <Routes>
            <Route path=":name" element={<PerkViewer />} />
            <Route path="*" element={<>
                <Breadcrumbs crumbs={[LibraryRootRoute, PerksRoute]} />
                <h1>Perks</h1>
                <PerkFiltersComponent onFilter={(initializer) => setFilter(new PerkFilter(initializer))} useRoute />
                {allPerksLoaded && <PerkResults perks={filteredPerks} />}
                {!allPerksLoaded && <Loader>Loading Perks</Loader>}
            </>} />
        </Routes>
    )
}