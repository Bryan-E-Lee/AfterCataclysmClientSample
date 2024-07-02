import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { PersonalityInitializer } from '../../../entities/library/socials/Personality';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminPersonalityApi extends LibraryApi<typeof LibraryApiServerConfig.PersonalitiesApiConfig> {
    public async getAll(): Promise<ApiResponse<PersonalityInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving personalities.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getPersonalitiesWithIds(ids: string[]): Promise<ApiResponse<PersonalityInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving personalities.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async create(initializer: PersonalityInitializer): Promise<ApiResponse<PersonalityInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(initializer)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error while creating ${initializer.name}.`);
            }

            return await this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(initializer: PersonalityInitializer): Promise<ApiResponse<PersonalityInitializer>> {
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
                throw new Error(`Server error while updating ${initializer.name}.`);
            }

            return await this.generateResponse(response);
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
                value: id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryDelete);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error deleting perk.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
