import { AccountApi } from './Admin.Account';
import { Character, CharacterInitializer } from '../../../entities/characters/Character';
import { AccountApiServerConfig } from '../../../apis/account/config/AccountApiServerConfig';
import { ApiResponse } from '../../../apis/ApiResponse';

export class CharacterApi extends AccountApi<typeof AccountApiServerConfig.CharactersApiConfig> {
    /**
     * Gets all characters for a player.
     * @returns An API response with the character, if it exists.
     */
    public async getAllCharacters(): Promise<ApiResponse<CharacterInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving characters.');
            }
            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Gets a character with the requested id.
     * @param id The character's id
     * @returns An API response with the requested character, if it exists.
     */
    public async getCharacter(id: string): Promise<ApiResponse<CharacterInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('get', {
                name: ':id',
                value: id,
            });
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while creating character.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Creates a new character for the player.
     * @returns An API response with the newly created character's id.
     */
    public async createNewCharacter(): Promise<ApiResponse<CharacterInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while creating character.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates a character.
     * @param character The character to update
     * @returns
     */
    public async updateCharacter(character: Character): Promise<ApiResponse<CharacterInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: character.id,
            });
            const token = await this.getToken();
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while updating character.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
