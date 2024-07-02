import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminHazardsView = () => {
    const { hazards, allHazardsLoaded } = useSelector((app: AdminState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allHazardsLoaded) {
            dispatch(AdminLibraryActions.loadHazards());
        }
    }, [dispatch, allHazardsLoaded]);
    return (
        <>
            <Link to="Create">
                <ThemedButton disabled={false}>Create New</ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Hazards</th>
                    </tr>
                </thead>
                <tbody>
                    {hazards.map(hazard => (
                        <tr key={hazard.id}>
                            <td>{hazard.name}</td>
                            <td>
                                <Link to={`${hazard.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${hazard.name}?`) && dispatch(AdminLibraryActions.deleteHazard(hazard))}>
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