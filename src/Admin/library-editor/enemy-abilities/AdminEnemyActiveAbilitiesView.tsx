import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemyActiveAbilitiesView = () => {
    const { enemyActiveAbilities, allEnemyActiveAbilitiesLoaded } = useSelector((app: AdminState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allEnemyActiveAbilitiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemyActiveAbilities());
        }
    }, [dispatch, allEnemyActiveAbilitiesLoaded]);
    return (
        <>
            <Link to="Create">
                <ThemedButton disabled={false}>Create New</ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Enemy Active Abilities</th>
                    </tr>
                </thead>
                <tbody>
                    {enemyActiveAbilities.map(eaa => (
                        <tr key={eaa.id}>
                            <td>{eaa.name}</td>
                            <td>
                                <Link to={`${eaa.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => dispatch(AdminLibraryActions.deleteEnemyActiveAbility(eaa))}>
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