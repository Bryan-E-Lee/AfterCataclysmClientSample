import * as JsonPatch from 'fast-json-patch';
import { LibraryApi } from "./Api.Library";
import { ApiResponse, SuccessApiResponse } from "../responses/ApiResponse";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";
import { ItemInitializer, UnknownItemInitializer } from "../../entities/library/items/ItemInitializers";
import { AuthorizedRoles } from "../../config/AuthConfig";

export class ItemApi extends LibraryApi<typeof LibraryApiServerConfig.ItemApiConfig> {
    public async getItems(): Promise<ApiResponse<UnknownItemInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving items.');
            }
            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getItemsWithIds(ids: string[]): Promise<ApiResponse<UnknownItemInitializer[]>> {
        try { 
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving items.');
            }

            return this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }    

    public async create(item: ItemInitializer): Promise<ApiResponse<UnknownItemInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(item),
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error creating ${item.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async patch(oldVersion: ItemInitializer, newVersion: ItemInitializer): Promise<ApiResponse<ItemInitializer>> {
        try {
            const operations = JsonPatch.compare(oldVersion, newVersion);
            if (!operations.any()) {
                return new SuccessApiResponse<ItemInitializer>(oldVersion);
            }
            const { uri, method } = this.config.getUriAndMethod('patch', {
                name: ':id',
                value: oldVersion.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations),
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error patching ${oldVersion.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(item: ItemInitializer): Promise<ApiResponse<UnknownItemInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: item.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(item),
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error updating ${item.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async delete(id: string): Promise<ApiResponse<void>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('delete', {
                name: ':id',
                value: id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryDelete);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error deleting item.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}