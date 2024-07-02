import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminPersonalitiesView = () => {
    const personalities = useSelector((app: AdminState) => app.library.personalities);
    const dispatch = useDispatch();
    const positivePersonalities = personalities.filter(p => p.positive);
    const negativePersonalities = personalities.filter(p => !p.positive);
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
                        <th colSpan={100000}>Positive Personalities</th>
                    </tr>
                </thead>
                <tbody>
                    {positivePersonalities.map(personality => (
                        <tr key={personality.id}>
                            <td>{personality.name}</td>
                            <td>
                                <Link to={`${personality.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${personality.name}?`) && dispatch(AdminLibraryActions.deletePersonality(personality))}>
                                    Delete
                                </ThemedButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={100000}>Negative Personalities</th>
                    </tr>
                </thead>
                <tbody>
                    {negativePersonalities.map(personality => (
                        <tr key={personality.id}>
                            <td>{personality.name}</td>
                            <td>
                                <Link to={`${personality.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${personality.name}?`) && dispatch(AdminLibraryActions.deletePersonality(personality))}>
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