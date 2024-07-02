import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminEnemiesView = () => {
    const { enemies, allEnemiesLoaded } = useSelector((app: AdminState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allEnemiesLoaded) {
            dispatch(AdminLibraryActions.loadEnemies());
        }
    }, [dispatch, allEnemiesLoaded]);
    return (
        <>
            <Link to="Create">
                <ThemedButton disabled={false}>Create New</ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Enemies</th>
                    </tr>
                </thead>
                <tbody>
                    {enemies.map(enemy => (
                        <tr key={enemy.id}>
                            <td>{enemy.name}</td>
                            <td>{enemy.tags.join(', ')}</td>
                            <td>
                                <Link to={`${enemy.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => dispatch(AdminLibraryActions.deleteEnemy(enemy))}>
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