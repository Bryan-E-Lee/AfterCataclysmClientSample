import * as JsonPatch from 'fast-json-patch';
import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse, SuccessApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { ContainerInitializer } from '../../../entities/library/items/ItemInitializers';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminContainerApi extends LibraryApi<typeof LibraryApiServerConfig.ItemsApiConfig> {
    public async create(container: ContainerInitializer): Promise<ApiResponse<ContainerInitializer>> {
        try {
            const { uri, method } =
                this.config.getUriAndMethod('createContainer');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(container),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error creating container.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async patch(oldVersion: ContainerInitializer, newVersion: ContainerInitializer): Promise<ApiResponse<ContainerInitializer>> {
        try {
            const operations = JsonPatch.compare(oldVersion, newVersion);
            if (!operations.any()) {
                return new SuccessApiResponse<ContainerInitializer>(oldVersion);
            }
            const { uri, method } = this.config.getUriAndMethod('patchContainer', {
                name: ':id',
                value: oldVersion.id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error patching container.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(container: ContainerInitializer): Promise<ApiResponse<ContainerInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('updateContainer', {
                name: ':id',
                value: container.id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(container),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error updating container.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
