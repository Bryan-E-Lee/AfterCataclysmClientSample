import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { SkillFilter } from "../../../entities/filters/SkillFiilter";
import { SkillFiltersComponent } from "./SkillFiltersComponent";
import { SkillResults } from "./SkillResults";
import { SkillViewer } from "./SkillViewer";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { LibraryRootRoute, SkillsRoute } from "../navigation/LibraryRoutes";
import { Route, Routes } from "react-router";
import { Loader } from "../../theming/loader/Loader";

export const SkillsLibrary = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const { skills } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!skills.any() && !loaded) {
            dispatch(LibraryActions.loadSkills());
        }
        setLoaded(true);
    }, [dispatch, skills]);

    const [filter, setFilter] = useState<SkillFilter>(new SkillFilter(SkillFilter.GetDefaultInitializer()));
    const filteredSkills = filter.filterSkills(skills);

    return (
        <Routes>
            <Route path=":name/*" element={<SkillViewer />} />
            <Route path="*" element={<>
                <Breadcrumbs crumbs={[LibraryRootRoute, SkillsRoute]} />
                <h1>Skills</h1>
                <SkillFiltersComponent onFilter={(initializer) => setFilter(new SkillFilter(initializer))} useRoute />
                {loaded && <SkillResults skills={filteredSkills} />}
                {!loaded && <Loader>Loading Skills</Loader>}
            </>} />
        </Routes>
    )
}