import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ObjectIcons } from "../../../../../components/icons";
import { ThemedButton } from "../../../../../components/inputs/buttons/ThemedButton";
import { SpellInitializer, isSpellInitializer } from "../../../../../entities/library/items/ItemInitializers";
import { AdminState } from "../../../../store/stores/AdminState";
import { AdminLibraryActions } from "../../../../store/stores/library/AdminLibraryStore.Actions";
import { RecordStatus } from "../../../../../entities/RecordStatus";

export const AdminSpellsView = () => {
    const items = useSelector((app: AdminState) => app.library.items);
    const dispatch = useDispatch();
    const spells = items.filter<SpellInitializer>(isSpellInitializer);
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
                        <th colSpan={10000}>Spells</th>
                    </tr>
                </thead>
                <tbody>
                    {spells.map(spell => (
                        <tr key={spell.id} className={getRecordClass(spell.recordStatus)}>
                            <td>{ObjectIcons.GetIcon(spell.icon)} {spell.name}</td>
                            <td>{spell.tags.join(', ')}</td>
                            <td>
                                <Link to={`${spell.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${spell.name}?`) && dispatch(AdminLibraryActions.deleteItem(spell))}>
                                    Delete
                                </ThemedButton>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <th>Chemistry</th>
                        <td colSpan={1000}>{spells.count(s => s.recordStatus == RecordStatus.Published && s.tags.contains("Chemistry"))}</td>
                    </tr>
                    <tr>
                        <th>Electronics</th>
                        <td colSpan={1000}>{spells.count(s => s.recordStatus == RecordStatus.Published && s.tags.contains("Electronics"))}</td>
                    </tr>
                    <tr>
                        <th>Machinery</th>
                        <td colSpan={1000}>{spells.count(s => s.recordStatus == RecordStatus.Published && s.tags.contains("Machinery"))}</td>
                    </tr>
                    <tr>
                        <th>Medicine</th>
                        <td colSpan={1000}>{spells.count(s => s.recordStatus == RecordStatus.Published && s.tags.contains("Medicine"))}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

const getRecordClass = (recordStatus: RecordStatus) => {
    switch (recordStatus) {
        case RecordStatus.Published:
            return "published";
        case RecordStatus.Unpublished:
            return "unpublished";
        default:
            return "deleted";
    }
}