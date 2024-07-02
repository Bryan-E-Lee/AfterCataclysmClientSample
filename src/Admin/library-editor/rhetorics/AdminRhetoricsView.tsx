import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";

export const AdminRhetoricsView = () => {
    const rhetorics = useSelector((app: AdminState) => app.library.rhetorics);
    return (
        <>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={100000}>Rhetorics</th>
                    </tr>
                </thead>
                <tbody>
                    {rhetorics.map(rhetoric => (
                        <tr key={rhetoric.id}>
                            <td>{rhetoric.name}</td>
                            <td>
                                <Link to={`${rhetoric.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}