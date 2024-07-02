import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminPerksView = () => {
    const perks = useSelector((app: AdminState) => app.library.perks);
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
                        <th colSpan={10000}>Perks</th>
                    </tr>
                </thead>
                <tbody>
                    {perks.map(perk => (
                        <tr key={perk.id}>
                            <td>{perk.name}</td>
                            <td>
                                <Link to={`${perk.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => dispatch(AdminLibraryActions.deletePerk(perk))}>
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