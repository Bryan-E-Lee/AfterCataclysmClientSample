import '../../../utils/ArrayExtensions';
import { ObjectIcons } from "../../../components/icons";
import { Copyable } from "../../../utils/Copyable";
import { nonEmpty } from "../../../utils/TypeUtils";
import { ActiveAbility } from "../../abilities/ActiveAbility";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { Tag } from "../../categorization/Tag";
import { ModifierContainer } from "../../character-modifiers/ModifierContainer";
import { TextModifier } from "../../character-modifiers/TextModifier";
import { ValueModifier } from "../../character-modifiers/ValueModifier";
import { HandTrigger } from "../../rolls/HandTrigger";
import { SkillName } from "../skills/SkillMap";
import { SkillRequirement } from "../skills/SkillRequirement";
import { ExplicitItemKey } from "./ExplicitItemMap";
import { ItemInitializer, ItemTypeValue, ModInitializer, OwnedItemInitializer, unguardedIsAmmo } from "./ItemInitializers";
import { Mod } from "./mods/Mod";
import { SortModSlots, ModSlot, IsLegalModForSlot as IsLegalModForModSlot, SlotTypesMatch } from "./mods/ModSlot";
import { getUniqueIdentifier } from '../../../utils/GUID';
import { Container } from './containers/Container';
import { RecordStatus } from '../../RecordStatus';
import { CharacterAbility } from '../../abilities/Ability';
import { OwnedReference } from '../../Ownership';

export type NonContainerCollectionName = 'Held' | 'Worn' | 'Loose';
export type ItemCollectionName = NonContainerCollectionName;

export type NonContainerCollectionInfo = { collection: NonContainerCollectionName, container?: Container };
export type ItemCollectionInfo = NonContainerCollectionInfo;

export type ItemSortableProperty = 'Name' | 'Cost' | 'Weight' | 'Tags';

export function isCompleteItem(initializer: ItemInitializer): initializer is Item {
    return Array.isArray((initializer as any).mods);
}

export class Item implements ItemInitializer, ModifierContainer, OwnedReference, Copyable {
    public constructor(initializer: OwnedItemInitializer) {
        this.id = initializer.id;
        this.instanceId = initializer.instanceId;

        this.name = initializer.name;
        this.customName = initializer.customName;
        this.customNotes = initializer.customNotes;
        this.description = initializer.description;
        this.icon = initializer.icon;
        if(initializer.explicitType) {
            this.explicitType = initializer.explicitType;
        }

        this.cost = initializer.cost;
        this.weight = initializer.weight;

        this.armor = initializer.armor;
        this.resilience = initializer.resilience;
        this.handsUsedModifier = initializer.handsUsedModifier;
        this.handsAvailableModifier = initializer.handsAvailableModifier;
        
        this.wornOn = initializer.wornOn;

        this.skillsUsed = initializer.skillsUsed;
        this.skillRequirements = initializer.skillRequirements ?? [];
        this.handTriggers = initializer.handTriggers ?? [];

        this.actions = initializer.actions ?? [];
        this.reactions = initializer.reactions ?? [];
        this.passives = initializer.passives ?? [];

        this.slots = initializer.slots || [];
        this.slots.sort(SortModSlots);

        this.customSlots = initializer.customSlots || [];
        this.customSlots.sort(SortModSlots);

        this.blacklistTags = initializer.blacklistTags;
        this.blacklistTags.sort(Tag.Sort);

        this.tags = initializer.tags;
        this.tags.sort(Tag.Sort);

        this.recordStatus = initializer.recordStatus;
        
        this.saved = initializer.saved;
    }

    public static readonly MaxCustomSlots: number = 10;

    public readonly id: string;
    public instanceId: string;
    public readonly name: string;
    public customName?: string;
    public customNotes?: string;
    public readonly type: ItemTypeValue = 'Item';
    public readonly explicitType?: ExplicitItemKey | undefined;
    public readonly description: string;
    public readonly icon: string;
    public readonly skillsUsed: SkillName[];
    public readonly cost: number;
    public readonly weight: number;
    public readonly armor?: number;
    public readonly resilience?: number;
    public readonly handsUsedModifier: number;
    public readonly handsAvailableModifier: number;

    public readonly wornOn: string[];
    public readonly skillRequirements: SkillRequirement[];
    public readonly handTriggers: HandTrigger[];
    public readonly actions: ActiveAbility[];
    public readonly reactions: ReactiveAbility[];
    public readonly passives: PassiveAbility[];
    public readonly slots: ModSlot[];
    public customSlots: ModSlot[];
    public mods: Mod[] = []; //Must be initialized in factory to prevent circular reference.
    public readonly blacklistTags: string[];
    public readonly tags: string[];
    public valueModifiers: ValueModifier[] = [];
    public textModifiers: TextModifier[] = [];
    public readonly recordStatus: RecordStatus;
    public saved: boolean;
    
    public get displayName(): string {
        return this.customName
            ? `${this.customName} (${this.name})`
            : this.name;
    }

    public get iconElement(): JSX.Element {
        return ObjectIcons.GetIcon(this.icon);
    }

    public get containedItems(): Mod[] {
        const modContainedItems = this.mods.mapMany(mod => mod.containedItems);
        return [...this.mods, ...modContainedItems];
    }

    public copy(): this {
        return new (<any>this.constructor)({...this, instanceId: getUniqueIdentifier() }) as this;
    }

    public get tagText(): string {
        return this.tags.join(', ');
    }

    public containsTag(tag: string): boolean {
        return this.tags.find(t => t == tag) != null;
    }

    public get allSlots(): ModSlot[] {
        return [...this.slots, ...this.customSlots, ...this.mods.mapMany(m => m.allSlots)];
    }

    private get occupiedSlotIds(): string[] {
        return this.mods
            .map(mod => mod.assignedSlotId)
            .filter<string>(nonEmpty);
    }

    public get occupiedSlots(): ModSlot[] {
        return this.allSlots.filter(ms => this.occupiedSlotIds.contains(ms.id))
    }

    public get unoccupiedSlots(): ModSlot[] {
        return this.allSlots.filter(ms => !this.occupiedSlotIds.contains(ms.id));
    }

    public get extraHandsProvided(): number {
        return this.mods.sum(m => m.extraHandsProvided)
    }

    public get abilityCount(): number {
        return this.actions.length
            + this.reactions.length
            + this.passives.length;
    }

    public get sourcedActions(): CharacterAbility[] {
        const handTriggers = this.handTriggers ?? [];
        const ammoTriggers = this.mods
            .filter(mod => mod.type == 'Ammo') //Cannot use type guards because of circular references
            .mapMany(ammo => ammo.handTriggers);
        return this.actions.map(a => ({ ...a, source: this.name, handTriggers: [...handTriggers, ...ammoTriggers] }));
    }

    public get modActions(): CharacterAbility[] {
        return this.mods.mapMany(mod => mod.getActions(this));
    }

    public get displayActions(): CharacterAbility[] {
        return [
            ...this.mods.filter(m => !unguardedIsAmmo(m)).mapMany(m => m.getActions(this))
        ].unique(a => a.id);
    }

    public get sourcedReactions(): CharacterAbility[] {
        return this.reactions.map(r => ({ ...r, source: this.name }));
    }

    public get modReactions(): CharacterAbility[] {
        return this.mods.mapMany(mod => mod.getReactions(this));
    }

    public get allReactions(): CharacterAbility[] {
        return [
            ...this.sourcedReactions,
            ...this.modReactions
        ].unique(r => r.id);
    }

    public get displayReactions(): CharacterAbility[] {
        return [
            ...this.sourcedReactions,
            ...this.mods.mapMany(m => m.getReactions(this))
        ].unique(r => r.id);
    }

    public get sourcedPassives(): CharacterAbility[] {
        return this.passives.map(p => ({ ...p, juices: false, dejuices: false, source: this.name }));
    }

    public get modPassives(): CharacterAbility[] {
        return this.mods.mapMany(mod => mod.getPassives(this));
    }

    public get allPassives(): CharacterAbility[] {
        return [
            ...this.sourcedPassives,
            ...this.modPassives
        ].unique(p => p.id);
    }

    public get displayPassives(): CharacterAbility[] {
        return [
            ...this.sourcedPassives,
            ...this.mods.mapMany(m => m.getPassives(this))
        ].unique(p => p.id);
    }

    public get totalHandsUsed(): number {
        return this.handsUsedModifier + this.mods.sum(m => m.totalHandsUsed);
    }
    
    public get totalExtraHandsAvailable(): number {
        return this.handsAvailableModifier + this.mods.sum(m => m.totalExtraHandsAvailable);
    }

    public get initializer(): OwnedItemInitializer {
        const { 
            sourcedActions,
            sourcedReactions,
            sourcedPassives,
            ...initializer
        } =  {
            ...this,
            mods: this.mods.map(mod => mod.initializer),
        };
        return initializer;
    }

    public isLegalItemForMod(slot: ModSlot, mod: ModInitializer): boolean {
        //If slot types exactly match, override any other restrictions.
        if (SlotTypesMatch(slot, mod)) {
            return true;
        }
        return mod.assignableToTags.length == 0
            || this.tags.intersection(mod.assignableToTags).length > 0;
    }

    public isLegalModForSlot(mod: ModInitializer, slotId: string): boolean {
        const slot = this.allSlots.find(s => s.id == slotId);
        if (slot == null) {
            return false;
        }
        return IsLegalModForModSlot(slot, mod)
            && this.isLegalItemForMod(slot, mod)
            && !this.blacklistTags.intersection(mod.tags).any();
    }

    public findItem(itemInstanceId: string): Item | undefined {
        let found: Item | undefined = this.mods.find(mod => mod.instanceId == itemInstanceId);
        if (found != undefined) {
            return found;
        }
        for (let mod of this.mods) {
            found = mod.findItem(itemInstanceId);
            if (found != undefined) {
                break;
            }
        }
        return found;
    }

    public findSlottingItem(slotId: string): Item | undefined {
        if (this.slots.any(slot => slot.id == slotId)
            || this.customSlots.any(slot => slot.id == slotId)) {
            return this;
        }
        return this.containedItems.first(ci => ci.findSlottingItem(slotId) != undefined) ?? undefined;
    }

    public removeInstance(itemInstanceId: string): Item | undefined {
        return this.removeFromMods(itemInstanceId)
            ?? this.removeFromModsNested(itemInstanceId);
    }

    protected removeFromMods(itemInstanceId: string): Item | undefined {
        const removeIndex = this.mods.findIndex(m => m.instanceId == itemInstanceId);
        const removed = this.mods[removeIndex];
        if (removed != null) {
            this.mods.splice(removeIndex, 1);
        }
        return removed;
    }

    protected removeFromModsNested(itemInstanceId: string): Item | undefined {
        let removed: Item | undefined;
        for (let mod of this.mods) {
            removed = mod.removeInstance(itemInstanceId);
            if (removed != undefined) {
                break;
            }
        }
        return removed;
    }

    public static Sort = (property: ItemSortableProperty) =>
        (item1: ItemInitializer, item2: ItemInitializer) => {
            switch (property) {
                case 'Name':
                    return Item.SortByString(item1.name, item2.name);
                case 'Cost':
                    return Item.SortByNumber(item1.cost, item2.cost);
                case 'Weight':
                    return Item.SortByNumber(item1.weight, item2.weight);
                case 'Tags':
                    return Item.SortByStringArr(item1.tags, item2.tags);
                default:
                    throw new Error("Incomparable item sort requested.");
            }
        }

    protected static SortByString = (stringProp1: string, stringProp2: string): number => stringProp1.localeCompare(stringProp2);

    protected static SortByNumber = (numProp1: number, numProp2: number): number => numProp1 - numProp2;
    
    protected static SortByStringArr = (arrProp1: string[], arrProp2: string[]): number => {
        const sortedArr1 = arrProp1.sort().join();
        const sortedArr2 = arrProp2.sort().join();
        return sortedArr1.localeCompare(sortedArr2);
    }
}