import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router"
import { ErrorToast } from "../../../entities/toasts/Toasts";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { ToastDispatchables } from "../../../store/stores/toasts/Toasts.Actions";
import { LoadingText } from "../../theming/loader/LoadingText";
import { AdventureContent } from "./AdventureContent";
import { AdventureHeader } from "./AdventureHeader";
import { AdventureInvite } from "./AdventureInvite";
import { AdventureNotes } from "./AdventureNotes";
import { Adventurers } from "./Adventurers";
import { useParams } from "react-router";

export const AdventureComponent: React.FC = () => {
    const appState = useSelector((state: ApplicationState) => state);
    const { adventures, loaded } = appState.adventure;
    const dispatch = useDispatch();
    const params = useParams();
    
    if (!loaded) {
        return <LoadingText />;
    }

    const id = params["id" as keyof typeof params];
    const invalidId = id == null || id == '';

    const adventure = adventures.find(c => c.id == id);
    if (adventure == null || invalidId) {
        console.error('Adventure not found!');
        ToastDispatchables.toast(new ErrorToast("Adventure not found!"), dispatch);
        //TODO: Use error boundary
        return null;
    }

    const userId = appState.user.me?.id;
    const isOwner = adventure.ownerId == userId;
    return (
        <div className="adventure">
            <AdventureHeader adventure={adventure} isOwner={isOwner} />
            {isOwner && <AdventureInvite adventure={adventure} />}
            <AdventureContent adventure={adventure} isOwner={isOwner} />
            <p>{adventure.description}</p>
            <Adventurers adventure={adventure} />
            <AdventureNotes adventure={adventure} isOwner={isOwner} />
        </div>
    )
}