import { AddItemSlotsRequest } from "../../../apis/requests/AddItemSlotsRequest";
import { AbilitiesByLevelCollection } from "../../abilities/AbilitiesByLevelCollection";
import { CharacterAbility } from "../../abilities/Ability";
import { TextModifier } from "../../character-modifiers/TextModifier";
import { ValueModifier } from "../../character-modifiers/ValueModifier";
import { Character } from "../../characters/Character";
import { Item } from "../items/Item";
import { ModSlot } from "../items/mods/ModSlot";
import { OwnedSkillReference } from "../../Ownership";
import { RecordStatus } from "../../RecordStatus";
import { Roller } from "../Roller";
import { SkillName } from "./SkillMap";

export interface SkillInitializer {
    id: string;
    name: SkillName;
    description: string;
    featuresByLevel: AbilitiesByLevelCollection[];
    recordStatus: RecordStatus;
}

export const DefaultSkillInitializer: SkillInitializer = {
    id: '',
    name: 'Athletics',
    description: '',
    featuresByLevel: [],
    recordStatus: RecordStatus.Published
}

export type AddSlotChangeRequest = { type: 'ADD', changes: AddItemSlotsRequest[] }
export type RemoveSlotChangeRequest = { type: 'REMOVE', changes: ModSlot[] };
export type NoSlotChangeRequest = { type: 'NONE' }

export function IsAddSlotChangeRequest(request: SlotChangeRequest): request is AddSlotChangeRequest {
    return request.type == 'ADD';
}

export function IsRemoveSlotChangeRequest(request: SlotChangeRequest): request is RemoveSlotChangeRequest {
    return request.type == 'REMOVE';
}

export function IsNoSlotChangeRequest(request: SlotChangeRequest): request is NoSlotChangeRequest {
    return request.type == 'NONE';
}

export type SlotChangeRequest = AddSlotChangeRequest | RemoveSlotChangeRequest | NoSlotChangeRequest;

export type OwnedSkillInitializer = SkillInitializer & OwnedSkillReference;

export class Skill implements OwnedSkillInitializer {
    public constructor(initializer: OwnedSkillInitializer) {
        this.id = initializer.id;
        this.instanceId = initializer.instanceId;
        this.name = initializer.name;
        this.description = initializer.description;
        this.level = initializer.level;
        this.adjustment = initializer.adjustment;
        this.override = initializer.override;
        this.featuresByLevel = initializer.featuresByLevel.sort(
            (sk1, sk2) => sk1.level - sk2.level
        );
        this.recordStatus = initializer.recordStatus;
        this.saved = initializer.saved;
    }

    public readonly id: string;
    public readonly instanceId: string;
    public readonly name: SkillName;
    public readonly description: string;
    public level: number;
    public adjustment: number;
    public override: number | undefined;
    public readonly featuresByLevel: AbilitiesByLevelCollection[];
    public valueModifiers: ValueModifier[] = [];
    public textModifiers: TextModifier[] = [];
    public readonly recordStatus: RecordStatus;
    public saved: boolean;

    public static readonly MinValue = 1;
    public static readonly MaxValue = 10;
    public static readonly MaxSkillDifference: number = 2;
    public static readonly PointsPerLevel: number = 3;

    public static FindSkillFilter = (name: SkillName) => {
        return (skill: Skill) => skill.name == name;
    }

    public get acquiredFeatures(): AbilitiesByLevelCollection[] {
        return this.featuresByLevel.filter(skf => skf.level <= this.level);
    }

    public get roller(): Roller {
        return new Roller(this.level);
    }

    public get pointsUsed(): number {
        return this.level - 1;
    }

    public get empowermentBonus(): number {
        return Math.floor(this.level / 2);
    }

    public get adjustedLevel(): number {
        if (this.override && this.override > 0) {
            return this.override;
        }
        return this.level + this.adjustment;
    }

    public get actions(): CharacterAbility[] {
        return this.acquiredFeatures.mapMany(sf => sf.activeAbilities
            .map(a => ({ ...a, source: `${this.name} ${sf.level}` }))
        );
    }

    public get reactions(): CharacterAbility[] {
        return this.acquiredFeatures.mapMany(sf => sf.reactiveAbilities
            .map(a => ({ ...a, source: `${this.name} ${sf.level}` }))
        );
    }

    public get passives(): CharacterAbility[] {
        return this.acquiredFeatures.mapMany(sf => sf.passiveAbilities
            .map(a => ({ ...a, source: `${this.name} ${sf.level}` }))
        );
    }

    public get abilities(): CharacterAbility[] {
        return [
            ...this.actions,
            ...this.reactions,
            ...this.passives
        ];
    }

    public getSlotChangesOnLevel(newLevel: number, character: Character): SlotChangeRequest {
        return { type: 'NONE' };
    }

    public getSlotChangesForItem(item: Item): SlotChangeRequest {
        return { type: 'NONE' };
    }

    public checkSlotChangesOnLoad(character: Character): SlotChangeRequest[] {
        return [];
    }
}