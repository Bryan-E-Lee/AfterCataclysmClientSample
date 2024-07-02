import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Loader } from "../../theming/loader/Loader";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { LibraryRootRoute, PerksRoute } from "../navigation/LibraryRoutes";
import { PerkBlock } from "./PerkBlock";
import { useLocation, useParams } from "react-router";

export const PerkViewer = () => {
    const location = useLocation();
    const params = useParams();
    const { perks, allPerksLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allPerksLoaded) {
        return <Loader />
    }

    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No perk name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(perks);
    const perk = set.getByName(name);
    if (perk == undefined) {
        throw new Error("No perk found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, PerksRoute, {path: location.pathname, name}]} />
            <PerkBlock perk={perk} />
        </>
    )
}