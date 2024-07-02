import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import React from "react";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { LibraryRootRoute, SkillsRoute } from "../navigation/LibraryRoutes";
import { SkillBlock } from "./SkillBlock";
import { useLocation, useParams } from "react-router";

export const SkillViewer = () => {
    const location = useLocation();
    const params = useParams();
    const { skills, allSkillsLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allSkillsLoaded) {
        return null;
    }

    let name = params["name" as keyof typeof params] as string | undefined;
    if (name == undefined) {
        throw new Error("No skill name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(skills);
    const skill = set.getByName(name);
    if (skill == undefined) {
        throw new Error("No skill found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, SkillsRoute, {path: location.pathname, name}]} />
            <SkillBlock skill={skill} expanded />
        </>
    )
}