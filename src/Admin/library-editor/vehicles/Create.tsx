import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { DefaultVehicle, Vehicle } from "../../../entities/library/vehicles/Vehicle";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { VehicleEditor } from "./VehicleEditor";

export const CreateVehicle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState<Vehicle>({ ...DefaultVehicle, id: getUniqueIdentifier() });
    const onSave = () => dispatch(AdminLibraryActions.createVehicle(state, (id: string) => navigate(`${id}/Edit`)));
    return (
        <>
            <h1>Create Vehicle</h1>
            <ThemedButton onClick={onSave}>Create</ThemedButton>
            <VehicleEditor vehicle={state} update={(vehicle) => setState({ ...vehicle })} />
            <ThemedButton onClick={onSave}>Create</ThemedButton>
        </>
    )
}