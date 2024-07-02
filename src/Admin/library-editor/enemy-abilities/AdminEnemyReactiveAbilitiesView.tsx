import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemyReactiveAbilitiesView = () => {
    const { enemyReactiveAbilities, allEnemyReactiveAbilitiesLoaded } = useSelector((app: AdminState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allEnemyReactiveAbilitiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemyReactiveAbilities());
        }
    }, [dispatch, allEnemyReactiveAbilitiesLoaded]);
    return (
        <>
            <Link to="Create">
                <ThemedButton disabled={false}>Create New</ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Enemy Reactive Abilities</th>
                    </tr>
                </thead>
                <tbody>
                    {enemyReactiveAbilities.map(era => (
                        <tr key={era.id}>
                            <td>{era.name}</td>
                            <td>
                                <Link to={`${era.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => dispatch(AdminLibraryActions.deleteEnemyReactiveAbility(era))}>
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