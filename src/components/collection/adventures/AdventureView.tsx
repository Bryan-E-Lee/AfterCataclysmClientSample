import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ErrorToast } from "../../../entities/toasts/Toasts";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { ToastDispatchables } from "../../../store/stores/toasts/Toasts.Actions";
import { AdventureContent } from "./AdventureContent";
import { AdventureHeader } from "./AdventureHeader";
import { AdventureInvite } from "./AdventureInvite";
import { AdventureNotes } from "./AdventureNotes";
import { Adventurers } from "./Adventurers";
import { useParams } from "react-router";
import { Loader } from "../../theming/loader/Loader";
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { UserActions } from "../../../store/stores/users/UserStore.Actions";
import { CharacterActions } from "../../../store/stores/collection/characters/CharacterStore.Actions";
import { AdventureControls } from "./AdventureControls";

export const AdventureView = () => {
    const appState = useSelector((state: ApplicationState) => state);
    const { adventures, loaded } = appState.adventure;
    const { me, users } = appState.user;
    const userSet = new SortedSet(users);
    const dispatch = useDispatch();
    const params = useParams();

    const id = params["id" as keyof typeof params];
    const invalidId = id == null || id == '';
    const adventure = adventures.find(c => c.id == id);
    
    useEffect(() => {
        if (adventure == null) {
            return;
        }
        dispatch(CharacterActions.getCharactersByIds(adventure.characterIds));
    }, [dispatch, adventure]);

    useEffect(() => {
        if (adventure == null || me == null) {
            return;
        }
        
        const allPlayerIds = [...adventure.playerIds, adventure.ownerId];
        const otherUserIds = allPlayerIds.filter(id => id != me.id);
        dispatch(UserActions.getUsersByIds(...otherUserIds));
    }, [dispatch, adventure, me]);
    
    if (!loaded || me == null) {
        return <Loader>Loading Adventure...</Loader>;
    }

    if (adventure == null || invalidId) {
        console.error('Adventure not found!');
        ToastDispatchables.toast(new ErrorToast("Adventure not found!"), dispatch);
        throw new Error("Adventure not found.");
    }

    const isOwner = adventure.ownerId == me.id;
    const allPlayerIds = [...adventure.playerIds, adventure.ownerId];
    const otherUserIds = allPlayerIds.filter(id => id != me.id);

    if (otherUserIds.any(ouid => !userSet.containsKey(ouid))) {
        return <Loader>Loading players...</Loader>;
    }

    return (
        <div className="adventure">
            <AdventureHeader adventure={adventure} isOwner={isOwner} />
            {isOwner && <AdventureInvite adventure={adventure} />}
            <AdventureContent adventure={adventure} isOwner={isOwner} />
            <p>{adventure.description}</p>
            <Adventurers adventure={adventure} />
            {isOwner && <AdventureControls adventure={adventure} />}
            <AdventureNotes adventure={adventure} isOwner={isOwner} />
        </div>
    )
}