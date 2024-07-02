import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { LoadingText } from "../../theming/loader/LoadingText";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Loader } from "../../theming/loader/Loader";

export const AdventureList: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adventures, loaded } = useSelector((state: ApplicationState) => state.adventure);
    const onCreate = () => dispatch(AdventureActions.createAdventure((id: string) => navigate(`${id}/Edit`)));
    let unnamedAdventureCount = 0;
    return (
        <>
            <h1>My Adventures</h1>
            <div>
                <ThemedButton onClick={onCreate}>Create New Adventure</ThemedButton>
            </div>
            {!loaded && <Loader>Loading Adventures</Loader>}
            {loaded && !adventures.any() && "You're not participating in any campaigns yet!"}
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