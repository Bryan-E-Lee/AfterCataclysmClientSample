import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../../components/inputs/buttons/ThemedButton";
import { ModInitializer, isModInitializer } from "../../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../../store/stores/AdminState";
import { AdminLibraryActions } from "../../../store/stores/library/AdminLibraryStore.Actions";

export const AdminModsView = () => {
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
                        <th colSpan={10000}>Mods</th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter<ModInitializer>(isModInitializer)
                        .filter(mod => mod.type == 'Mod')
                        .map(mod => (
                            <tr key={mod.id}>
                                <td>{mod.name}</td>
                                <td>
                                    <Link to={`${mod.id}/Edit`}>
                                        <ThemedButton disabled={false}>Edit</ThemedButton>
                                    </Link>
                                </td>
                                <td>
                                    <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${mod.name}?`) && dispatch(AdminLibraryActions.deleteItem(mod))}>
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