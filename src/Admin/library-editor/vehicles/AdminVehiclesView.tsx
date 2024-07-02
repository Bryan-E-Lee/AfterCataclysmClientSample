import { useSelector } from "react-redux"
import { AdminState } from "../../store/stores/AdminState"
import React from "react";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";

export const AdminVehiclesView = () => {
    const vehicles = useSelector((app: AdminState) => app.library.vehicles);
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
                        <th colSpan={10000}>Vehicles</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.name}</td>
                            <td>
                                <Link to={`${vehicle.id}/Edit`}>
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