import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../../../components/inputs/buttons/ThemedButton";
import { AmmoInitializer, isAmmoInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../../../store/stores/AdminState";
import { AdminLibraryActions } from "../../../../store/stores/library/AdminLibraryStore.Actions";

export const AdminAmmunitionsView = () => {
    const items = useSelector((app: AdminState) => app.library.items);
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
                        <th colSpan={10000}>Ammo</th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter<AmmoInitializer>(isAmmoInitializer)
                        .map(ammo => (
                            <tr key={ammo.id}>
                                <td>{ammo.name}</td>
                                <td>{ammo.tags.join(', ')}</td>
                                <td>
                                    <Link to={`${ammo.id}/Edit`}>
                                        <ThemedButton disabled={false}>Edit</ThemedButton>
                                    </Link>
                                </td>
                                <td>
                                    <ThemedButton onClick={() => dispatch(AdminLibraryActions.deleteItem(ammo))}>
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