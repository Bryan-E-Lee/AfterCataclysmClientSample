import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminScenariosView = () => {
    const scenarios = useSelector((app: AdminState) => app.library.scenarios);
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
                        <th colSpan={100000}>Scenarios</th>
                    </tr>
                </thead>
                <tbody>
                    {scenarios.map(scenario => (
                        <tr key={scenario.id}>
                            <td>{scenario.name}</td>
                            <td>
                                <Link to={`${scenario.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${scenario.name}?`) && dispatch(AdminLibraryActions.deleteScenario(scenario))}>
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