import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Loader } from "../../theming/loader/Loader";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { LibraryRootRoute, PersonalitiesRoute } from "../navigation/LibraryRoutes";
import { PersonalityBlock } from "./PersonalityBlock";
import { useLocation, useParams } from "react-router";

export const PersonalityViewer = () => {
    const location = useLocation();
    const params = useParams();
    const { personalities, allPersonalitiesLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allPersonalitiesLoaded) {
        return <Loader />;
    }

    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No personality name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(personalities);
    const personality = set.getByName(name);
    if (personality == undefined) {
        throw new Error("No personality found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, PersonalitiesRoute, {path: location.pathname, name}]} />
            <PersonalityBlock personality={personality} />
        </>
    )
}