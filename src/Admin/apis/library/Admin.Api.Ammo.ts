import * as JsonPatch from 'fast-json-patch';
import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse, SuccessApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { AmmoInitializer } from '../../../entities/library/items/ItemInitializers';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminAmmoApi extends LibraryApi<typeof LibraryApiServerConfig.ItemsApiConfig> {
    public async create(ammo: AmmoInitializer): Promise<ApiResponse<AmmoInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('createAmmo');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(ammo),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error creating ammo.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async patch(oldVersion: AmmoInitializer, newVersion: AmmoInitializer): Promise<ApiResponse<AmmoInitializer>> {
        try {
            const operations = JsonPatch.compare(oldVersion, newVersion);
            if (!operations.any()) {
                return new SuccessApiResponse<AmmoInitializer>(oldVersion);
            }
            const { uri, method } = this.config.getUriAndMethod('patchAmmo', {
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
                throw new Error('Server error patching ammo.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(ammo: AmmoInitializer): Promise<ApiResponse<AmmoInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('updateAmmo', {
                name: ':id',
                value: ammo.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(ammo),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error updating ammo.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}