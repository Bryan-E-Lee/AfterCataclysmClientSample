import * as JsonPatch from 'fast-json-patch';
import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse, SuccessApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { ModInitializer } from '../../../entities/library/items/ItemInitializers';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminModApi extends LibraryApi<typeof LibraryApiServerConfig.ItemsApiConfig> {
    public async create(mod: ModInitializer): Promise<ApiResponse<ModInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('createMod');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(mod),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error creating mod.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async patch(oldVersion: ModInitializer, newVersion: ModInitializer): Promise<ApiResponse<ModInitializer>> {
        try {
            const operations = JsonPatch.compare(oldVersion, newVersion);
            if (!operations.any()) {
                return new SuccessApiResponse<ModInitializer>(oldVersion);
            }
            const { uri, method } = this.config.getUriAndMethod('patchMod', {
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
                throw new Error('Server error patching mod.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(mod: ModInitializer): Promise<ApiResponse<ModInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('updateMod', {
                name: ':id',
                value: mod.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(mod),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error updating mod.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
