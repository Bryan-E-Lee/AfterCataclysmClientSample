import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router"
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { decodeNameFromURI } from "../../../utils/StringUtilities";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { Breadcrumbs } from "../navigation/BreadCrumbs";
import { ItemsRoute, LibraryRootRoute } from "../navigation/LibraryRoutes";
import { ItemPreview } from "../../collection/characters/character-tools/items/preview/ItemPreview";
import { Loader } from "../../theming/loader/Loader";
import { ItemPreviewHeader } from "../../collection/characters/character-tools/items/preview/ItemPreviewHeader";
import { useLocation, useParams } from "react-router";

export const ItemViewer = () => {
    const location = useLocation();
    const params = useParams();
    const { items, allItemsLoaded } = useSelector((app: ApplicationState) => app.library);
    if (!allItemsLoaded) {
        return <Loader />;
    }

    let name = params["name" as keyof typeof params] as string | undefined;
    if (name == undefined) {
        throw new Error("No item name provided.");
    }
    name = decodeNameFromURI(name);

    const set = new SortedSet(items);
    const item = set.getByName(name);
    if (item == undefined) {
        throw new Error("No item found.");
    }

    return (
        <>
            <Breadcrumbs crumbs={[LibraryRootRoute, ItemsRoute, {path: location.pathname, name}]} />
            <div className="entity-view entity-panel">
                <ItemPreviewHeader item={item} />
                <ItemPreview item={item} />
            </div>
        </>
    )
}