import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { EnemiesRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { useLocation, useParams } from "react-router";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { StatBlock } from "../../../entities/library/enemies/StatBlock";

export const EnemyViewer = () => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const { enemies, allEnemiesLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allEnemiesLoaded) {
            dispatch(LibraryActions.loadEnemies());
        }
    }, [dispatch, allEnemiesLoaded]);
    
    let name = params["name"] as string | undefined;
    if (name == undefined) {
        throw new Error("No enemy name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(enemies);
    const enemy = set.getByName(name);
    if (enemy == undefined) {
        throw new Error("No hazard found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, EnemiesRoute, {path: location.pathname, name}]} />
            <StatBlock enemy={enemy} />
        </>
    )
}