import React from "react";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { useSelector, useDispatch } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { RecordStatusNames } from "../../../entities/RecordStatus";

export const AdminItemsView = () => {
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
                        <th colSpan={100000}>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter(item => item.type == 'Item').map(item => (
                        <tr key={item.id} className={`${RecordStatusNames[item.recordStatus].toLowerCase()}-row`}>
                            <td>{item.name}</td>
                            <td>{RecordStatusNames[item.recordStatus]}</td>
                            <td>
                                <Link to={`${item.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${item.name}?`) && dispatch(AdminLibraryActions.deleteItem(item))}>
                                    Delete
                                </ThemedButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}