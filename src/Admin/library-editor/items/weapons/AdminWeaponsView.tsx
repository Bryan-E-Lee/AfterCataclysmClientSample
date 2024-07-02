import React from "react"
import { Link } from "react-router-dom"
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton"
import { WeaponInitializer, isWeaponInitializer } from "../../../../entities/library/items/ItemInitializers"
import { AdminLibraryActions } from "../../../store/stores/library/AdminLibraryStore.Actions"
import { useSelector, useDispatch } from "react-redux"
import { AdminState } from "../../../store/stores/AdminState"

export const AdminWeaponsView = () => {
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
                        <th colSpan={10000}>Weapons</th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter<WeaponInitializer>(isWeaponInitializer)
                        .map(weapon => (
                            <tr key={weapon.id}>
                                <td>{weapon.name}</td>
                                <td>
                                    <Link to={`${weapon.id}/Edit`}>
                                        <ThemedButton disabled={false}>Edit</ThemedButton>
                                    </Link>
                                </td>
                                <td>
                                    <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${weapon.name}?`) && dispatch(AdminLibraryActions.deleteItem(weapon))}>
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