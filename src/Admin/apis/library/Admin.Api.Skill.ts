import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { SkillInitializer } from '../../../entities/library/skills/Skill';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminSkillApi extends LibraryApi<typeof LibraryApiServerConfig.SkillsApiConfig> {
    public async getAll(): Promise<ApiResponse<SkillInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving skills.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getSkillsWithIds(ids: string[]): Promise<ApiResponse<SkillInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('allWithIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids),
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving skills.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async create(initializer: SkillInitializer): Promise<ApiResponse<SkillInitializer>> {
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

    public async update(initializer: SkillInitializer): Promise<ApiResponse<SkillInitializer>> {
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
                throw new Error('Server error deleting skill.');
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
