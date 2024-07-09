import * as JsonPatch from 'fast-json-patch';
import { AccountApi } from "./Api.Account";
import { CharacterInitializer } from "../../entities/characters/Character";
import { AccountApiServerConfig } from "./config/AccountApiServerConfig";
import { AuthorizedRoles } from '../../config/AuthConfig';
import { OwnedRhetoricInitializer, RhetoricPriority } from '../../entities/library/socials/Rhetoric';
import { OwnedMinionInitializer } from '../../entities/library/minions/Minion';
import { OwnedItemInitializer, OwnedModInitializer } from '../../entities/library/items/ItemInitializers';
import { StatusCodes } from '../StatusCodes';
import { ApiResponse, SuccessApiResponse } from '../responses/ApiResponse';
import { AddItemSlotsRequest } from '../requests/AddItemSlotsRequest';
import { UpdateIdResponse } from '../responses/UpdateIdResponse';
import { OwnedCompetencyReference, OwnedSkillReference } from '../../entities/Ownership';
import { Competency } from '../../entities/characters/Competencies';

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
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving characters.');
            }
            return this.generateResponse(response, []);
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
            const { uri, method } = this.config.getUriAndMethod('get', { name: ':id', value: id });
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method
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
     * Gets characters by their unique ids.
     * @param ids The characters' unique ids.
     * @returns The characters with those unique ids.
     */
    public async getCharactersByIds(ids: string[]): Promise<ApiResponse<CharacterInitializer[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('getByIds');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
                method,
                body: JSON.stringify(ids)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving characters.');
            }
            return this.generateResponse(response, []);
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
            const token = await this.getToken(AuthorizedRoles.CharacterCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
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
     * @returns The character initializer if successful.
     */
    public async updateCharacter(character: CharacterInitializer): Promise<ApiResponse<CharacterInitializer>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', { name: ':id', value: character.id });
            const token = await this.getToken(AuthorizedRoles.CharacterUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(character),
            });

            if(this.isServerError(response)) {
                throw new Error('Server error while updating character.');
            }
            return new SuccessApiResponse(character);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Detects the difference between two versions of a character and submits a patch request with those changes.
     * @param oldVersion The old version of the character.
     * @param newVersion The new version of the character.
     * @returns An updated version of the character.
     */
    public async patchCharacter(oldVersion: CharacterInitializer, newVersion: CharacterInitializer): Promise<ApiResponse<CharacterInitializer>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            return new SuccessApiResponse<CharacterInitializer>(oldVersion);
        }

        try {
            const { uri, method } = this.config.getUriAndMethod('patch', { name: ':id', value: oldVersion.id });
            const token = await this.getToken(AuthorizedRoles.CharacterUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while patching character.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Deletes a character.
     * @param id The character's unique identifier.
     * @returns An API response indicating success or failure.
     */
    public async deleteCharacter(id: string): Promise<ApiResponse<undefined>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('delete', { name: ':id', value: id });
            const token = await this.getToken(AuthorizedRoles.CharacterDelete);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
            });

            if (this.isServerError(response)) {
                throw new Error("Server error while deleting character.");
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    
    /**
     * Adds a condition to a character.
     * @param connectionId The adventure connection id this instance is using.
     * @param characterId The character's unique id.
     * @param conditionId The condition's unique id.
     */
    public async addCondition(connectionId: string, characterId: string, conditionId: string): Promise<ApiResponse<undefined>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('addCondition', { name: ':id', value: characterId });
            const token = await this.getToken(AuthorizedRoles.CharacterUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify({connectionId, conditionId})
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while adding condition.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a condition from a character.
     * @param characterId The character's unique id.
     * @param conditionId The condition's unique id.
     */
    public async removeCondition(characterId: string, conditionId: string): Promise<ApiResponse<undefined>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('removeCondition',
                { name: ':id', value: characterId },
                { name: ':conditionId', value: conditionId });
            const token = await this.getToken(AuthorizedRoles.CharacterUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing condition.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a competency to a character.
     * @param characterId The character's unique id.
     * @param competencyId The competency's unique id.
     * @returns 
     */
    public async addCompetency(characterId: string, competencyId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('addCompetency',
            { name: ':id', value: characterId },
            { name: ':competencyId', value: competencyId });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(competencyId)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while adding competency.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a custom competency to a character.
     * @param characterId 
     * @param competency 
     * @returns 
     */
    public async addCustomCompetency(characterId: string, competency: Competency): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addCompetencyCustom',
            { name: ':id', value: characterId },
            { name: ':competencyId', value: competency.id });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(competency)
            });

            if (this.isServerError(response)) {
                throw new Error("Server error while adding custom competency.");
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a competency from a character.
     * @param characterId The character's unique id.
     * @param competencyId The competency's unique id.
     * @returns 
     */
    public async removeCompetency(characterId: string, competencyId: string): Promise<ApiResponse<undefined>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('removeCompetency',
                { name: ':id', value: characterId },
                { name: ':competencyId', value: competencyId });
            const token = await this.getToken(AuthorizedRoles.CharacterUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing competency.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates a competency.
     * @param characterId The character's unique id.
     * @param oldVersion The old version of the competency.
     * @param newVersion The updated version of the competency.
     */
    public async updateCompetency(characterId: string, oldVersion: OwnedCompetencyReference, newVersion: OwnedCompetencyReference): Promise<ApiResponse<undefined>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            return new SuccessApiResponse(undefined);
        }

        const { uri, method } = this.config.getUriAndMethod('updateCompetency',
            { name: ':id', value: characterId },
            { name: ':competencyId', value: oldVersion.id });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while updating competency.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates a custom competency.
     * @param characterId The character's unique id.
     * @param oldVersion The old version of the competency.
     * @param newVersion The updated version of the competency.
     */
    public async updateCustomCompetency(characterId: string, oldVersion: Competency, newVersion: Competency): Promise<ApiResponse<undefined>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            return new SuccessApiResponse(undefined);
        }

        const { uri, method } = this.config.getUriAndMethod('updateCompetencyCustom', 
            { name: ':id', value: characterId },
            { name: ':competencyId', value: oldVersion.id });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error("Server error while updating custom competency.");
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates a character's skill value.
     * @param characterId The character's unique id.
     * @param oldVersion The old version of the skill.
     * @param newVersion The updated version of the skill.
     * @returns 
     */
    public async updateSkill(characterId: string, oldVersion: OwnedSkillReference, newVersion: OwnedSkillReference): Promise<ApiResponse<undefined>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            //Only way to pass void as a parameter.
            return new SuccessApiResponse(undefined);
        }

        const { uri, method } = this.config.getUriAndMethod('updateSkill',
            { name: ':id', value: characterId },
            { name: ':skillId', value: oldVersion.id }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error patching character skill.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates a character's rhetoric value.
     * @param characterId The character's unique id.
     * @param oldVersion The old version of the rhetoric.
     * @param newVersion The updated version of the rhetoric.
     */
    public async updateRhetoric(characterId: string, oldVersion: OwnedRhetoricInitializer, newVersion: OwnedRhetoricInitializer): Promise<ApiResponse<undefined>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            //Only way to pass void as a parameter.
            return new SuccessApiResponse(undefined);
        }

        const { uri, method } = this.config.getUriAndMethod('updateRhetoric',
            { name: ':id', value: characterId },
            { name: ':rhetoricId', value: oldVersion.id }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error patching character rhetoric.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates a rhetoric's priority.
     * @param characterId The character's unique id.
     * @param rhetoricId The rhetoric's unique id.
     * @param priority The rhetoric's new priority.
     */
    public async updateRhetoricPriority(characterId: string, rhetoricId: string, priority: RhetoricPriority): Promise<ApiResponse<undefined>> {
        const {uri, method} = this.config.getUriAndMethod("updateRhetoricPriority",
            { name: ':id', value: characterId },
            { name: ':rhetoricId', value: rhetoricId }    
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(priority)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error adjusting rhetoric priority.')
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a perk to a character.
     * @param characterId The unique id of the character.
     * @param perkId The unique id of the perk to add.
     * @returns The unique instance id of the created perk.
     */
    public async addPerk(characterId: string, perkId: string): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addPerk', {
            name: ':id',
            value: characterId
        });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(perkId)
            });
            if (this.isServerError(response)) {
                throw new Error('Server error while adding perk.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a perk from a character.
     * @param characterId The unique id of the character.
     * @param perkId The unique instance id of the perk to remove.
     */
    public async removePerk(characterId: string, perkId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removePerk',
            { name: ':id', value: characterId },
            { name: ':perkId', value: perkId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });
            if (this.isServerError(response)) {
                throw new Error('Server error while removing perk.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a personality to a character.
     * @param characterId The unique id of the character.
     * @param personalityId The unqiue id of the personality.
     * @returns The newly created personality's instance id.
     */
    public async addPersonality(characterId: string, personalityId: string): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addPersonality', { name: ':id', value: characterId });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(personalityId)
            });
            if (this.isServerError(response)) {
                throw new Error('Server error while adding personality.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a personality from a character.
     * @param characterId The unique id of the character.
     * @param personalityId The unique id of the personality to remove.
     * @returns 
     */
    public async removePersonality(characterId: string, personalityId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removePersonality',
            { name: ':id', value: characterId },
            { name: ':personalityId', value: personalityId}
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });
            if (this.isServerError(response)) {
                throw new Error('Server error while removing personality.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    
    /**
     * Adds an item to a character's inventory.
     * @param characterId The unique id of the character.
     * @param itemId The unique id of the item to add.
     * the item to, if applicable.
     * @returns The unique instance id of the created item.
     */
    public async addItem(characterId: string, itemId: string): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addItem', { name: ':id', value: characterId });

        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(itemId)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error while adding item to inventory.`);
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a collection of items to a character's inventory.
     * @param characterId The unique id of the character.
     * @param itemIds The unique ids of the items to add.
     * @returns An updated character initializer with the items where they were added.
     */
    public async addItemRange(characterId: string, itemIds: string[]): Promise<ApiResponse<CharacterInitializer | null>> {
        const { uri, method } = this.config.getUriAndMethod('addItemRange', { name: ':id', value: characterId });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(itemIds)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error while adding items to inventory.`);
            }
            if (response.status == StatusCodes.NoContent) {
                return new SuccessApiResponse(null);
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Updates an item in a character's inventory.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The unique instance id of the item to update.
     */
    public async updateItem(characterId: string, oldVersion: OwnedItemInitializer, newVersion: OwnedItemInitializer): Promise<ApiResponse<undefined>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            //Only way to pass void as a parameter.
            return new SuccessApiResponse(undefined);
        }

        const { uri, method } = this.config.getUriAndMethod('updateItem',
            { name: ':id', value: characterId },
            { name: ':itemInstanceId', value: oldVersion.instanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while updating item.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Holds an item.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The item's unique instance id.
     * @param replacementInstanceIds The unique item instance ids to be replaced.
     */
    public async holdItem(characterId: string, itemInstanceId: string, replacementInstanceIds: string[] = []): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('holdItem', { name: ':id', value: characterId });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify({ itemInstanceId, replacementInstanceIds })
            });

            this.validateServerError(response, 'Server error while trying to hold item.');
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Wears an item.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The item's unique instance id.
     * @param replacementInstanceIds The unique item instance ids to be replaced.
     */
    public async wearItem(characterId: string, itemInstanceId: string, replacementInstanceIds: string[] = []): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('wearItem', { name: ':id', value: characterId });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify({ itemInstanceId, replacementInstanceIds })
            });

            this.validateServerError(response, 'Server error while trying to wear item.');
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Moves an item to a character's loose item collection.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The item's unique instance id.
     */
    public async moveToLoose(characterId: string, itemInstanceId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('moveToLoose', { name: ':id', value: characterId });
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(itemInstanceId)
            });

            this.validateServerError(response, 'Server error moving item to loose items.');
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes an item from the character's inventory.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The item's unique instance id.
     */
    public async removeItem(characterId: string, itemInstanceId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removeItem',
            { name: ':id', value: characterId },
            { name: ':itemInstanceId', value: itemInstanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing item.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Modifies an item in a character's inventory.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The unique instance id of the item to modify.
     * @param mod The mod to assign to the item.
     */
    public async assignMod(characterId: string, itemInstanceId: string, mod: OwnedModInitializer): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('assignMod',
            { name: ':id', value: characterId },
            { name: ':itemInstanceId', value: itemInstanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(mod)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while assigning mod.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Modifies an item in a character's inventory.
     * @param characterId The unique id of the character.
     * @param mod The mod to assign to the item.
     */
    public async assignBodyMod(characterId: string, mod: OwnedModInitializer): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('assignBodyMod',
            { name: ':id', value: characterId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(mod)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while assigning body mod.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a new mod to an item and assigns it to the requested slot.
     * @param characterId The unique id of the character.
     * @param itemInstanceId The unique instance id of the item to modify.
     * @param mod The mod initializer to have the new mod match.
     */
    public async addAndAssignMod(characterId: string, itemInstanceId: string, mod: OwnedModInitializer): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addAndAssignMod',
            { name: ':id', value: characterId },
            { name: ':itemInstanceId', value: itemInstanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(mod)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while adding and assigning mod.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a new mod to an item and assigns it to the requested slot.
     * @param characterId The unique id of the character.
     * @param mod The mod initializer to have the new mod match.
     */
    public async addAndAssignBodyMod(characterId: string, mod: OwnedModInitializer): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addAndAssignBodyMod',
            { name: ':id', value: characterId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(mod)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while adding and assigning body mod.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a mod from an item.
     * @param characterId 
     * @param itemInstanceId 
     * @param modInstanceId 
     */
    public async removeMod(characterId: string, itemInstanceId: string, modInstanceId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removeMod',
            { name: ':id', value: characterId },
            { name: ':itemInstanceId', value: itemInstanceId },
            { name: ':modInstanceId', value: modInstanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing mod.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    
    /**
     * Removes a body mod from a character.
     * @param characterId 
     * @param modInstanceId 
     */
    public async removeBodyMod(characterId: string, modInstanceId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removeBodyMod',
            { name: ':id', value: characterId },
            { name: ':modInstanceId', value: modInstanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing body mod.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a custom mod slot to an item.
     * @param characterId 
     * @param itemInstanceIds 
     * @param slots The mod slot to add.
     * @returns The unique id of the newly added mod slot.
     */
    public async addSlots(characterId: string, requests: AddItemSlotsRequest[]): Promise<ApiResponse<UpdateIdResponse[]>> {
        const { uri, method } = this.config.getUriAndMethod('addSlots',
            { name: ':id', value: characterId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(requests)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while adding slot.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a custom mod slot from an item.
     * @param characterId
     * @param slotIds
     */
    public async removeSlots(characterId: string, slotIds: string[]): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removeSlots',
            { name: ':id', value: characterId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(slotIds)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing slot.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Adds a minion to a character.
     * @param characterId The unique id of the character.
     * @param minionId The unique id of the minion to add.
     * @returns The unique instance id of the created minion.
     */
    public async addMinion(characterId: string, minionId: string): Promise<ApiResponse<string>> {
        const { uri, method } = this.config.getUriAndMethod('addMinion',
            { name: ':id', value: characterId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(minionId)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while adding minion.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Update's a character's minion.
     * @param characterId The unique id of the character.
     * @param oldVersion The old version of the minion.
     * @param newVersion The updated version of the minion.
     */
    public async updateMinion(characterId: string, oldVersion: OwnedMinionInitializer, newVersion: OwnedMinionInitializer): Promise<ApiResponse<undefined>> {
        const operations = JsonPatch.compare(oldVersion, newVersion);
        if (!operations.any()) {
            //Only way to pass void as a parameter.
            return new SuccessApiResponse(undefined);
        }

        const { uri, method } = this.config.getUriAndMethod('updateMinion',
            { name: ':id', value: characterId },
            { name: ':minionInstanceId', value: oldVersion.instanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(operations)
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while updating minion.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * Removes a minion from a character's horde.
     * @param characterId The unique id of the character.
     * @param minionInstanceId The unique instance id of the minion to remove.
     */
    public async removeMinion(characterId: string, minionInstanceId: string): Promise<ApiResponse<undefined>> {
        const { uri, method } = this.config.getUriAndMethod('removeMinion',
            { name: ':id', value: characterId },
            { name: ':minionInstanceId', value: minionInstanceId }
        );
        const token = await this.getToken(AuthorizedRoles.CharacterUpdate);

        try {
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while removing minion.');
            }
            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}