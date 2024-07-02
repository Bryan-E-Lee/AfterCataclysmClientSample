import * as JsonPatch from 'fast-json-patch';
import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse, SuccessApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { WeaponInitializer } from '../../../entities/library/items/ItemInitializers';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminWeaponApi extends LibraryApi<typeof LibraryApiServerConfig.ItemsApiConfig> {
    public async create(weapon: WeaponInitializer): Promise<ApiResponse<WeaponInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('createWeapon');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(weapon),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error creating weapon.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async patch(oldVersion: WeaponInitializer, newVersion: WeaponInitializer): Promise<ApiResponse<WeaponInitializer>> {
        try {
            const operations = JsonPatch.compare(oldVersion, newVersion);
            if (!operations.any()) {
                return new SuccessApiResponse<WeaponInitializer>(oldVersion);
            }
            const { uri, method } = this.config.getUriAndMethod('patchWeapon', {
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
                throw new Error('Server error patching item.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(weapon: WeaponInitializer): Promise<ApiResponse<WeaponInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod(
                'updateWeapon',
                { name: ':id', value: weapon.id }
            );
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(weapon),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error updating weapon.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
