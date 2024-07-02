import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import React from "react";
import { Loader } from "../../theming/loader/Loader";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { CompetenciesRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { CompetencyBlock } from "./CompetencyBlock";
import { useLocation, useParams } from "react-router";

export const CompetencyViewer = () => {
    const location = useLocation();
    const params = useParams();
    const { competencies, allCompetenciesLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allCompetenciesLoaded) {
        return <Loader />;
    }

    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No competency name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(competencies);
    const competency = set.getByName(name);
    if (competency == undefined) {
        throw new Error("No competencies found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, CompetenciesRoute, {path: location.pathname, name}]} />
            <CompetencyBlock competency={competency} />
        </>
    )
}