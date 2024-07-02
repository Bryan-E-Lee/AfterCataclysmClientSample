import { Vehicle } from "../../entities/library/vehicles/Vehicle";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class VehicleApi extends LibraryApi<typeof LibraryApiServerConfig.VehicleApiConfig> {
    public async getAll(): Promise<ApiResponse<Vehicle[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving vehicles.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getVehiclesWithIds(ids: string[]): Promise<ApiResponse<Vehicle[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving vehicles.');
            }
            
            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}