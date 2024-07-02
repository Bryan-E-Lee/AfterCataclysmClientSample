import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemyPassiveAbilitiesView = () => {
    const { enemyPassiveAbilities, allEnemyPassiveAbilitiesLoaded } = useSelector((app: AdminState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allEnemyPassiveAbilitiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemyPassiveAbilities());
        }
    }, [dispatch, allEnemyPassiveAbilitiesLoaded]);
    return (
        <>
            <Link to="Create">
                <ThemedButton disabled={false}>Create New</ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Enemy Passive Abilities</th>
                    </tr>
                </thead>
                <tbody>
                    {enemyPassiveAbilities.map(epa => (
                        <tr key={epa.id}>
                            <td>{epa.name}</td>
                            <td>
                                <Link to={`${epa.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => dispatch(AdminLibraryActions.deleteEnemyPassiveAbility(epa))}>
                                    Delete
                                </ThemedButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}