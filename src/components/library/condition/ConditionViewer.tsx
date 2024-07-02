import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Loader } from "../../theming/loader/Loader";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { ConditionsRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { ConditionBlock } from "./ConditionBlock";
import { useLocation, useParams } from "react-router";

export const ConditionViewer = () => {
    const location = useLocation();
    const params = useParams();
    const { conditions, allConditionsLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allConditionsLoaded) {
        return <Loader />
    }

    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No condition name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(conditions);
    const condition = set.getByName(name);
    if (condition == undefined) {
        throw new Error("No condition found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, ConditionsRoute, {path: location.pathname, name}]} />
            <ConditionBlock condition={condition} />
        </>
    )
}