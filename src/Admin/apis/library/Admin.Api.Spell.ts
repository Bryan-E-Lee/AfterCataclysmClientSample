import * as JsonPatch from 'fast-json-patch';
import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse, SuccessApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { SpellInitializer } from '../../../entities/library/items/ItemInitializers';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminSpellApi extends LibraryApi<typeof LibraryApiServerConfig.ItemsApiConfig> {

    public async create(spell: SpellInitializer): Promise<ApiResponse<SpellInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('createSpell');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(spell),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error creating spell.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async patch(oldVersion: SpellInitializer, newVersion: SpellInitializer): Promise<ApiResponse<SpellInitializer>> {
        try {
            const operations = JsonPatch.compare(oldVersion, newVersion);
            if (!operations.any()) {
                return new SuccessApiResponse<SpellInitializer>(oldVersion);
            }
            const { uri, method } = this.config.getUriAndMethod('patchSpell', {
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

    public async update(spell: SpellInitializer): Promise<ApiResponse<SpellInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod(
                'updateSpell',
                { name: ':id', value: spell.id }
            );
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(spell),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error updating spell.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
