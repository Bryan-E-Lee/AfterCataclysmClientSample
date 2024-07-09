import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Loader } from "../../theming/loader/Loader";
import { ErrorNotification } from "../../notifications/Notification";

export const AdventureList: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adventures, loaded, error } = useSelector((state: ApplicationState) => state.adventure);
    const onCreate = () => dispatch(AdventureActions.createAdventure((id: string) => navigate(`${id}/Edit`)));
    const loadCompleted = loaded && !error;
    let unnamedAdventureCount = 0;
    return (
        <>
            <h1>My Adventures</h1>
            {loadCompleted && <div>
                <ThemedButton onClick={onCreate}>Create New Adventure</ThemedButton>
            </div>}
            {loadCompleted && !adventures.any() && "You're not participating in any adventures yet!"}
            {!loaded && !error && <Loader>Loading Adventures</Loader>}
            {error && <ErrorNotification>There was an error loading your adventures, you can try refreshing the page to fix the issue.</ErrorNotification>}
            <ul className="owned-list">
                {adventures.map(adventure => {
                    const name = adventure.name.trim() == ''
                        ? `Unnamed Adventure ${++unnamedAdventureCount}`
                        : adventure.name;
                    return (
                        <li key={adventure.id}>
                            <Link key={adventure.id} to={`/Adventures/${adventure.id}`}>
                                {name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}