import { LibraryApi } from '../../../apis/library/Api.Library';
import { ApiResponse } from '../../../apis/responses/ApiResponse';
import { AuthorizedRoles } from '../../../config/AuthConfig';
import { EnemyReactiveAbility } from '../../../entities/library/enemies/EnemyAbilities';
import { LibraryApiServerConfig } from './config/LibraryApiServerConfig';

export class AdminEnemyReactiveAbilityApi extends LibraryApi<typeof LibraryApiServerConfig.EnemyReactiveAbilityApiConfig> {
    public async getAll(): Promise<ApiResponse<EnemyReactiveAbility[]>> {
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

    public async create(ability: EnemyReactiveAbility): Promise<ApiResponse<EnemyReactiveAbility>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(ability)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error while creating ${ability.name}.`);
            }

            return await this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async update(ability: EnemyReactiveAbility): Promise<ApiResponse<EnemyReactiveAbility>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: ability.id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(ability)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error while updating ${ability.name}.`);
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
