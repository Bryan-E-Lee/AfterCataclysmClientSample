import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminConditionsView = () => {
    const {conditions, allConditionsLoaded} = useSelector((app: AdminState) => app.library)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allConditionsLoaded) {
            dispatch(AdminLibraryActions.loadConditions());
        }
    }, [dispatch, allConditionsLoaded]);
    return (
        <>
            <Link to='Create'>
                <ThemedButton disabled={false}>Create New</ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Conditions</th>
                    </tr>
                </thead>
                <tbody>
                    {conditions.map(condition => (
                        <tr key={condition.id}>
                            <td>{condition.name}</td>
                            <td>
                                <Link to={`${condition.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${condition.name}?`) && dispatch(AdminLibraryActions.deleteCondition(condition))}>
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