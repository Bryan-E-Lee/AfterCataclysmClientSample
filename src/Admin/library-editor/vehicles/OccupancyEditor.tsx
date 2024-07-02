import React from "react"
import { Occupancy } from "../../../entities/library/vehicles/Occupancy"
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { getUniqueIdentifier } from "../../../utils/GUID"

type Props = {
    occupancies: Occupancy[];
    update: (occupancies: Occupancy[]) => unknown;
}

export const OccupancyEditor = (props: Props) => {
    const { occupancies, update } = props;
    const onAdd = () => {
        update([...occupancies, {
            id: getUniqueIdentifier(),
            name: "",
            capacity: 1,
            description: ""
        }]);
    }

    const onDelete = (index: number) => {
        occupancies.splice(index, 1);
        update([...occupancies]);
    }

    const updateOccupancy = (occupancy: Occupancy, index: number) => {
        occupancies.splice(index, 1, occupancy);
        update([...occupancies]);
    }
    return (
        <>
            <ThemedButton onClick={onAdd}>+ Add Occupancy</ThemedButton>
            <ul>
                {occupancies.map((occupancy, index) => (
                    <li key={occupancy.id}>
                        <div>
                            <label>Name</label>
                            <input type="text" value={occupancy.name}
                                onChange={e => updateOccupancy({ ...occupancy, name: e.target.value }, index)} />
                        </div>
                        <div>
                            <label>Capacity</label>
                            <input type="number" value={occupancy.capacity} step={1}
                                onChange={e => updateOccupancy({ ...occupancy, capacity: parseInt(e.target.value) }, index)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea value={occupancy.description}
                                onChange={e => updateOccupancy({ ...occupancy, description: e.target.value }, index)} />
                        </div>
                        <ThemedButton onClick={() => onDelete(index)}>
                            Delete {occupancy.name}
                        </ThemedButton>
                    </li>
                ))}
            </ul>
        </>
    )
}