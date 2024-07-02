import { Vehicle } from "../../../../../entities/library/vehicles/Vehicle"
import { ErrorToast, SuccessToast } from "../../../../../entities/toasts/Toasts"
import { ToastAction, ToastDispatchables } from "../../../../../store/stores/toasts/Toasts.Actions"
import { AdminThunkAction } from "../../AdminState"

type AdminVehiclesLoaded = { type: 'ADMIN_VEHICLES_LOADED', vehicles: Vehicle[] }
type AdminVehicleCreate = { type: 'ADMIN_VEHICLE_CREATE', vehicle: Vehicle }
type AdminVehicleUpdate = { type: 'ADMIN_VEHICLE_UPDATE', vehicle: Vehicle }
type AdminVehicleDelete = { type: 'ADMIN_VEHICLE_DELETE', id: string }

export type AdminVehicleAction = AdminVehiclesLoaded
    | AdminVehicleCreate
    | AdminVehicleUpdate
    | AdminVehicleDelete;

export const VehicleActions = {
    loadVehicles: (): AdminThunkAction<AdminVehiclesLoaded | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.vehicles;
                const response = await api.getAll();
                if (response.status == 'Success') {
                    dispatch({ type: 'ADMIN_VEHICLES_LOADED', vehicles: response.payload });
                }
                else {
                    ToastDispatchables.toast(new ErrorToast("Error loading vehicles."), dispatch);
                }
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    createVehicle: (vehicle: Vehicle, successCallback: (id: string) => unknown): AdminThunkAction<AdminVehicleCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.vehicles;
                const response = await api.create(vehicle);
                if (response.status == 'Error') {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${vehicle.name}.`), dispatch);
                    return;
                }
                dispatch({ type: 'ADMIN_VEHICLE_CREATE', vehicle: response. payload });
                successCallback(response.payload.id);
                ToastDispatchables.toast(new SuccessToast(`${response.payload.name} created.`), dispatch);
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    updateVehicle: (vehicle: Vehicle): AdminThunkAction<AdminVehicleCreate | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.vehicles;
                const response = await api.update(vehicle);
                if (response.status == 'Error') {
                    ToastDispatchables.toast(new ErrorToast(`Error creating ${vehicle.name}`), dispatch);
                    return;
                }
                ToastDispatchables.toast(new SuccessToast(`${response.payload.name} updataed.`), dispatch);
                dispatch({ type: 'ADMIN_VEHICLE_CREATE', vehicle: response.payload });
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        },

    deleteVehicle: (vehicle: Vehicle): AdminThunkAction<AdminVehicleDelete | ToastAction> =>
        async (dispatch, getState) => {
            try {
                const api = getState().api.vehicles;
                const response = await api.delete(vehicle.id);
                if (response.status == 'Error') {
                    ToastDispatchables.toast(new ErrorToast(`Error deleting ${vehicle.id}.`), dispatch);
                    return;
                }
                ToastDispatchables.toast(new SuccessToast(`Sucessfully deleted ${vehicle.name}.`), dispatch);
                dispatch({ type: 'ADMIN_VEHICLE_DELETE', id: vehicle.id });
            }
            catch (e: any) {
                console.error(e);
                ToastDispatchables.toast(new ErrorToast(e.message), dispatch);
            }
        }
}