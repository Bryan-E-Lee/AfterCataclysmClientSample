import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminMinionsView = () => {
    const minions = useSelector((app: AdminState) => app.library.minions);
    const dispatch = useDispatch();
    return (
        <>
            <Link to='Create'>
                <ThemedButton disabled={false}>
                    Create New
                </ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Minions</th>
                    </tr>
                </thead>
                <tbody>
                    {minions.map(minion => (
                        <tr key={minion.id}>
                            <td>{minion.name}</td>
                            <td>
                                <Link to={`${minion.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${minion.name}?`) && dispatch(AdminLibraryActions.deleteMinion(minion))}>
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