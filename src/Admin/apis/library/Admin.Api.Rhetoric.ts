import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { RhetoricInitializer } from '../../../entities/library/socials/Rhetoric';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminRhetoricApi extends LibraryApi<typeof LibraryApiServerConfig.RhetoricsApiConfig> {
    public async getAll(): Promise<ApiResponse<RhetoricInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving rhetorics.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getRhetoricsWithIds(ids: string[]): Promise<ApiResponse<RhetoricInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving rhetorics.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(initializer: RhetoricInitializer): Promise<ApiResponse<RhetoricInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: initializer.id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(initializer)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server erro while updating ${initializer.name}.`);
            }
            
            return await this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
