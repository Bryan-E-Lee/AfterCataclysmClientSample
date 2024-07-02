import React from "react";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { useSelector } from "react-redux";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { HazardBlock } from "../../../entities/library/hazards/HazardBlock";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { HazardsRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { Loader } from "../../theming/loader/Loader";
import { useLocation, useParams } from "react-router";

export const HazardViewer = () => {
    const location = useLocation();
    const params = useParams();
    const {hazards, allHazardsLoaded} = useSelector((app: ApplicationState) => app.library);
    if (!allHazardsLoaded) {
        return <Loader />;
    }

    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No hazard name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(hazards);
    const hazard = set.getByName(name);
    if (hazard == undefined) {
        throw new Error("No hazard found.");
    }
    
    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, HazardsRoute, {path: location.pathname, name}]} />
            <HazardBlock hazard={hazard} />
        </>
    );
}