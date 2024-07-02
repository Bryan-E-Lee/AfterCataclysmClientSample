import { CharacterApi } from "../apis/account/Api.Character";
import { CompetencyApi } from "../apis/library/Api.Competency";
import { ConditionApi } from "../apis/library/Api.Condition";
import { ItemApi } from "../apis/library/Api.Item";
import { MinionApi } from "../apis/library/Api.Minions";
import { PerkApi } from "../apis/library/Api.Perk";
import { PersonalityApi } from "../apis/library/Api.Personality";
import { RhetoricApi } from "../apis/library/Api.Rhetoric";
import { SkillApi } from "../apis/library/Api.Skill";
import { ApiResponse, ErrorApiResponse, SuccessApiResponse } from "../apis/responses/ApiResponse";
import { ValidationMessage } from "../apis/ValidationMessage";
import { CharacterEntityReferences, CharacterInitializer } from "../entities/characters/Character";
import { CompetencyInitializer } from "../entities/characters/Competencies";
import { Condition } from "../entities/characters/Conditions";
import { SortedSet } from "../entities/data-structures/SortedSet";
import { ItemInitializer, UnknownItemInitializer } from "../entities/library/items/ItemInitializers";
import { MinionInitializer } from "../entities/library/minions/Minion";
import { OwnedReference, OwnedContainerReference } from "../entities/Ownership";
import { PerkInitializer } from "../entities/library/perks/Perk";
import { SkillInitializer } from "../entities/library/skills/Skill";
import { PersonalityInitializer } from "../entities/library/socials/Personality";
import { RhetoricInitializer } from "../entities/library/socials/Rhetoric";

export type CharacterEntityInitializers = {
    characters: CharacterInitializer[];
    competencies: CompetencyInitializer[];
    conditions: Condition[];
    items: UnknownItemInitializer[];
    minions: MinionInitializer[];
    perks: PerkInitializer[];
    personalities: PersonalityInitializer[];
    rhetorics: RhetoricInitializer[];
    skills: SkillInitializer[];
}

export class CharacterService {
    public constructor(
        characterApi: CharacterApi,
        competencyApi: CompetencyApi,
        conditionApi: ConditionApi,
        itemApi: ItemApi,
        minionApi: MinionApi,
        perkApi: PerkApi,
        personalityApi: PersonalityApi,
        rhetoricApi: RhetoricApi,
        skillApi: SkillApi
    ) {
        this.characterApi = characterApi;
        this.competencyApi = competencyApi;
        this.conditionApi = conditionApi;
        this.itemApi = itemApi;
        this.minionApi = minionApi;
        this.perkApi = perkApi;
        this.personalityApi = personalityApi;
        this.rhetoricApi = rhetoricApi;
        this.skillApi = skillApi;
    }

    private readonly characterApi: CharacterApi;
    private readonly competencyApi: CompetencyApi;
    private readonly conditionApi: ConditionApi;
    private readonly itemApi: ItemApi;
    private readonly minionApi: MinionApi;
    private readonly perkApi: PerkApi;
    private readonly personalityApi: PersonalityApi;
    private readonly rhetoricApi: RhetoricApi;
    private readonly skillApi: SkillApi;

    public async getAllCharactersWithEntities(references: CharacterEntityReferences): Promise<ApiResponse<CharacterEntityInitializers>> {
        const charactersResponse = await this.characterApi.getAllCharacters();
        if (charactersResponse.status == 'Error') {
            return new ErrorApiResponse<CharacterEntityInitializers>(charactersResponse.validationResults);
        }
        const characters = charactersResponse.payload;
        return await this.getCharactersWithEntities(references, characters);
    }


    public async getCharactersByIdsWithEntities(references: CharacterEntityReferences, ids: string[]): Promise<ApiResponse<CharacterEntityInitializers>> {
        const charactersResponse = await this.characterApi.getCharactersByIds(ids);
        if (charactersResponse.status == 'Error') {
            return new ErrorApiResponse<CharacterEntityInitializers>(charactersResponse.validationResults);
        }
        const characters = charactersResponse.payload;
        return await this.getCharactersWithEntities(references, characters);
    }

    /**
     * Retrieves characters and their associated entities.
     * @param references Sorted sets of the entities referenced on a character initializer.
     * @param characters Character initializers to retrieve entities for.
     * @returns A collection of character initializers and initializers for their referenced entities.
     */
    private async getCharactersWithEntities(references: CharacterEntityReferences, characters: CharacterInitializer[]): Promise<ApiResponse<CharacterEntityInitializers>> {
        const competenciesPromise = this.competencyApi.getAll();
        const conditionsPromise = this.conditionApi.getAll();
        const itemsPromise = this.getCharacterItems(characters, references.items);
        const minionsPromise = this.getCharacterMinions(characters, references.minions);
        const perksPromise = this.getCharacterPerks(characters, references.perks);
        const personalitiesPromise = this.getCharacterPersonalities(characters, references.personalities);
        const rhetoricsPromise = this.getCharacterRhetorics(characters, references.rhetorics);
        const skillsPromise = this.getCharacterSkills(characters, references.skills);
        
        const validationResults: ValidationMessage[] = [];
        const competenciesResponse = await competenciesPromise;
        if (competenciesResponse.status == 'Error') {
            validationResults.push(...competenciesResponse.validationResults);
        }

        const conditionsResponse = await conditionsPromise;
        if (conditionsResponse.status == 'Error') {
            validationResults.push(...conditionsResponse.validationResults);
        }

        const itemResponse = await itemsPromise;
        if (itemResponse.status == 'Error') {
            validationResults.push(...itemResponse.validationResults);
        }

        const minionResponse = await minionsPromise;
        if (minionResponse.status == 'Error') {
            validationResults.push(...minionResponse.validationResults);
        }

        const perkResponse = await perksPromise;
        if (perkResponse.status == 'Error') {
            validationResults.push(...perkResponse.validationResults);
        }

        const personalityResponse = await personalitiesPromise;
        if (personalityResponse.status == 'Error') {
            validationResults.push(...personalityResponse.validationResults);
        }

        const rhetoricResponse = await rhetoricsPromise;
        if (rhetoricResponse.status == 'Error') {
            validationResults.push(...rhetoricResponse.validationResults);
        }

        const skillResponse = await skillsPromise;
        if (skillResponse.status == 'Error') {
            validationResults.push(...skillResponse.validationResults);
        }

        const hasErrors = competenciesResponse.status == 'Error'
            || conditionsResponse.status == 'Error'
            || itemResponse.status == 'Error'
            || minionResponse.status == 'Error'
            || perkResponse.status == 'Error'
            || personalityResponse.status == 'Error'
            || rhetoricResponse.status == 'Error'
            || skillResponse.status == 'Error';
        if (hasErrors) {
            return new ErrorApiResponse<CharacterEntityInitializers>(validationResults);
        }

        const initializers: CharacterEntityInitializers = {
            characters: characters,
            competencies: competenciesResponse.payload,
            conditions: conditionsResponse.payload,
            items: itemResponse.payload,
            minions: minionResponse.payload,
            perks: perkResponse.payload,
            personalities: personalityResponse.payload,
            rhetorics: rhetoricResponse.payload,
            skills: skillResponse.payload
        };
        return new SuccessApiResponse(initializers);
    }

    private async getCharacterItems(characters: CharacterInitializer[], items: SortedSet<ItemInitializer>): Promise<ApiResponse<ItemInitializer[]>> {
        const itemIds = characters.mapMany(character => {
                return character.worn.concat(character.held).concat(character.loose);
            })
            .map(reference => reference.id)
            .filter(id => !items.containsKey(id));
        return await this.itemApi.getItemsWithIds(itemIds);
    }

    private async getCharacterMinions(characters: CharacterInitializer[], minions: SortedSet<MinionInitializer>): Promise<ApiResponse<MinionInitializer[]>> {
        const minionIds = characters.mapMany(character => character.minions)
            .map(m => m.id)
            .filter(id => !minions.containsKey(id));
        return await this.minionApi.getMinionInitializersWithIds(minionIds);
    }

    private async getCharacterPerks(characters: CharacterInitializer[], perks: SortedSet<PerkInitializer>): Promise<ApiResponse<PerkInitializer[]>> {
        const perkIds = characters.mapMany(character => character.perks)
            .map(p => p.id)
            .filter(id => !perks.containsKey(id));
        return await this.perkApi.getPerksWithIds(perkIds);
    }

    private async getCharacterPersonalities(characters: CharacterInitializer[], personalities: SortedSet<PersonalityInitializer>): Promise<ApiResponse<PersonalityInitializer[]>> {
        const personalityIds = characters.mapMany(character => character.personalities)
            .map(p => p.id)
            .filter(id => !personalities.containsKey(id));
        return await this.personalityApi.getPersonalitiesWithIds(personalityIds);
    }

    private async getCharacterRhetorics(characters: CharacterInitializer[], rhetorics: SortedSet<RhetoricInitializer>): Promise<ApiResponse<RhetoricInitializer[]>> {
        const rhetoricIds = characters.mapMany(character => character.rhetorics)
            .map(r => r.id)
            .filter(id => !rhetorics.containsKey(id));
        return await this.rhetoricApi.getRhetoricsWithIds(rhetoricIds);
    }

    private async getCharacterSkills(characters: CharacterInitializer[], skills: SortedSet<SkillInitializer>): Promise<ApiResponse<SkillInitializer[]>> {
        const skillIds = characters.mapMany(character => character.skills)
            .map(s => s.id)
            .filter(id => !skills.containsKey(id));
        return await this.skillApi.getSkillsWithIds(skillIds);
    }
}