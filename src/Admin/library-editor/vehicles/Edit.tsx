import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { SortedSet } from "../../../entities/data-structures/SortedSet";
import { DefaultVehicle, Vehicle } from "../../../entities/library/vehicles/Vehicle";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { VehicleEditor } from "./VehicleEditor";

export const EditVehicle = () => {
    const [state, setState] = useState<Vehicle>({ ...DefaultVehicle });

    const vehicles = useSelector((app: AdminState) => app.library.vehicles);
    const params = useParams();

    useEffect(() => {
        if (!vehicles.any()) {
            return;
        }

        const id = params["id" as keyof typeof params] as string | undefined;
        if (id == undefined) {
            throw new Error(`Attempt to edit null identified vehicle with id ${id}.`);
        }

        const set = new SortedSet(vehicles);
        const initializer = set.get(id);
        if (initializer == null) {
            throw new Error(`Attempt to edit unknown vehicle with id ${id}.`);
        }
        setState({ ...initializer })
    }, [params, vehicles]);

    const dispatch = useDispatch();
    const updateState = (initializer: Vehicle) => setState({ ...initializer });
    return (
        <>
            <h1>Edit Vehicle</h1>
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateVehicle(state))}>Save</ThemedButton>
            <VehicleEditor vehicle={state} update={updateState} />
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.updateVehicle(state))}>Save</ThemedButton>
        </>
    )
}
