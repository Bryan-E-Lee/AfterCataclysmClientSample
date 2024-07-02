import { Container } from "../library/items/containers/Container";
import { ItemFactory } from "../library/items/ItemFactory";
import { Perk, PerkInitializer } from "../library/perks/Perk";
import { Skill, SkillInitializer } from "../library/skills/Skill";
import { CombineValueModifiers, SourcedValue, ValueModifier } from "../character-modifiers/ValueModifier";
import { ValueType } from "../character-modifiers/CharacterModifier";
import { CombineTextModifiers, TextModifier } from "../character-modifiers/TextModifier";
import { SkillFactory } from "../library/skills/SkillFactory";
import { Kinship } from "./Kinships";
import { SortByName } from "../../utils/Sorting";
import { Rhetoric, RhetoricInitializer } from "../library/socials/Rhetoric";
import { Personality, PersonalityInitializer } from "../library/socials/Personality";
import { Weapon } from "../library/items/weapons/Weapon";
import { Item, ItemCollectionInfo } from "../library/items/Item";
import { RhetoricName } from "../library/socials/RhetoricMap";
import { SortedSet } from "../data-structures/SortedSet";
import { Minion, MinionInitializer } from "../library/minions/Minion";
import { createOwnedModInitializer, createOwnedWeaponInitializer,
        createUnknownItemInitializer,
        isWeaponInitializer, ItemInitializer, WeaponInitializer } from "../library/items/ItemInitializers";
import { NamedEntity } from "../NamedEntity";
import { InstanceIdKeyGetter, OwnedCompetencyReference, OwnedItemReference, OwnedMinionReference,
        OwnedModReference,
        OwnedReference, OwnedRhetoricReference, OwnedSkillReference } from "../Ownership";
import { isMod, Mod } from "../library/items/mods/Mod";
import { DefaultWornLimit, WornLimits } from "./WornLimits";
import { Condition } from "./Conditions";
import { nonEmpty } from "../../utils/TypeUtils";
import { CharacterAbility, GetCharacterAbilityKey } from "../abilities/Ability";
import { Competency, CompetencyInitializer } from "./Competencies";
import { ModSlot } from "../library/items/mods/ModSlot";
import { ModFactory } from "../library/items/mods/ModFactory";
import { RecordStatus } from "../RecordStatus";

export interface CharacterInitializer {
    id: string;
    ownerId: string;
    name: string;
    created: string;
    kinship: Kinship;
    level: number;
    className: string;
    enforceRules: boolean;
    money: number;

    adjustMaxHealth?: number;
    overrideMaxHealth?: number;

    currentHealth: number;
    currentWounds: number;
    juiced: boolean;

    customCompetencies: Competency[];
    competencies: OwnedCompetencyReference[];
    conditions: string[];

    baseMovement: number;
    movementAdjust: number;
    movementOverride?: number;

    skills: OwnedSkillReference[];
    rhetorics: OwnedRhetoricReference[];
    personalities: OwnedReference[];
    perks: OwnedReference[];

    bodySlots: ModSlot[];
    bodyMods: OwnedModReference[];

    held: OwnedItemReference[];
    worn: OwnedItemReference[];
    loose: OwnedItemReference[];

    minions: OwnedMinionReference[];
}

export type CharacterEntityReferences = {
    competencies: SortedSet<CompetencyInitializer>;
    conditions: SortedSet<Condition>;
    items: SortedSet<ItemInitializer>;
    minions: SortedSet<MinionInitializer>;
    perks: SortedSet<PerkInitializer>;
    personalities: SortedSet<PersonalityInitializer>;
    rhetorics: SortedSet<RhetoricInitializer>;
    skills: SortedSet<SkillInitializer>;
}

interface CharacterCollections {
    competencies: CompetencyInitializer[];
    conditions: Condition[];
    items: ItemInitializer[];
    minions: MinionInitializer[];
    perks: PerkInitializer[];
    personalities: PersonalityInitializer[];
    rhetorics: RhetoricInitializer[];
    skills: SkillInitializer[];
}

export const CollectionsToReferences = (collections: CharacterCollections): CharacterEntityReferences => {
    return {
        competencies: new SortedSet(collections.competencies),
        conditions: new SortedSet(collections.conditions),
        items: new SortedSet(collections.items),
        minions: new SortedSet(collections.minions),
        perks: new SortedSet(collections.perks),
        personalities: new SortedSet(collections.personalities),
        rhetorics: new SortedSet(collections.rhetorics),
        skills: new SortedSet(collections.skills)
    };
}

export class Character implements NamedEntity {
    public constructor(initializer: CharacterInitializer, references: CharacterEntityReferences) {
        this.id = initializer.id;
        this.ownerId = initializer.ownerId;
        this.name = initializer.name;
        this.created = new Date(initializer.created);
        this.kinship = initializer.kinship;
        this.level = initializer.level;
        this.className = initializer.className;
        this.enforceRules = initializer.enforceRules;
        this.money = initializer.money;

        this.adjustMaxHealth = initializer.adjustMaxHealth;
        this.overrideMaxHealth = initializer.overrideMaxHealth;

        this.currentHealth = initializer.currentHealth;
        this.currentWounds = initializer.currentWounds;
        this.juiced = initializer.juiced;

        this.baseMovement = initializer.baseMovement;
        this.movementAdjust = initializer.movementAdjust;
        this.movementOverride = initializer.movementOverride;

        this.customCompetencies = new SortedSet(initializer.customCompetencies);

        const competencies = initializer.competencies
            .filter(c => references.competencies.containsKey(c.id))
            .map<Competency>(c => ({
                ...c,
                ...references.competencies.get(c.id)!
            }))
        this.competencies = new SortedSet(competencies);

        const conditions = initializer.conditions
            .map(cid => references.conditions.get(cid))
            .filter<Condition>(nonEmpty);
        this.conditions = new SortedSet(conditions);

        const perks = initializer.perks
            .filter(p => references.perks.containsKey(p.id))
            .map(p => ({
                ...p,
                ...references.perks.get(p.id)!
            }))
            .map(perk => new Perk(perk));
        this.perks = new SortedSet(perks);

        const personalities =  initializer.personalities
            .filter(p => references.personalities.containsKey(p.id))
            .map(p => ({
                ...p,
                ...references.personalities.get(p.id)!
            }))
            .map(personality => new Personality(personality));
        this.personalities = new SortedSet(personalities);

        const rhetorics = initializer.rhetorics
            .filter(r => references.rhetorics.containsKey(r.id))
            .map(r => ({
                ...r,
                ...references.rhetorics.get(r.id)!
            }))
            .map(rhetoric => new Rhetoric(rhetoric));
        this.rhetorics = new SortedSet(rhetorics);

        const skills = initializer.skills
            .filter(s => references.skills.get(s.id)?.recordStatus == RecordStatus.Published)
            .map(s => ({
                ...s,
                ...references.skills.get(s.id)!
            }))
            .map(skill => SkillFactory.CreateSkill(skill));
        this.skills = new SortedSet(skills, skill => skill.name);

        const minions = initializer.minions
            .filter(m => references.minions.containsKey(m.id))
            .map(m => ({
                ...m,
                ...references.minions.get(m.id)!
            }))
            .map(minion => new Minion(minion));
        this.minions = new SortedSet(minions, InstanceIdKeyGetter);
        
        this.bodySlots = initializer.bodySlots;
        this.bodyMods = initializer.bodyMods
            .filter(bm => references.items.containsKey(bm.id))
            .map(bm => createOwnedModInitializer(
                references.items.get(bm.id)!,
                bm,
                references.items
            ))
            .map(bm => ModFactory.Create(bm));

        const held = initializer.held
            .filter(hand => references.items.containsKey(hand.id))
            .map(hand => createOwnedWeaponInitializer(
                    references.items.get<WeaponInitializer>(hand.id, isWeaponInitializer)!,
                    hand,
                    references.items))
            .map(hand => <Weapon>ItemFactory.CreateUnknown(hand));
        this.held = new SortedSet(held, InstanceIdKeyGetter);

        const worn = initializer.worn
            .filter(ref => references.items.containsKey(ref.id))
            .map(ref => createUnknownItemInitializer(references.items.get(ref.id)!, ref, references.items))
            .map(worn => ItemFactory.CreateUnknown(worn));
        this.worn = new SortedSet(worn, InstanceIdKeyGetter);

        const looseItems = initializer.loose
                .filter(ref => references.items.containsKey(ref.id))
                .map(ref => createUnknownItemInitializer(references.items.get(ref.id)!, ref, references.items))
                .map(i => ItemFactory.CreateUnknown(i));
        this.loose = new SortedSet(looseItems, InstanceIdKeyGetter);
    }

    public static MaxStartingMunitions: number = 2;
    public static MaxStartingKeepsakes: number = 1;
    public static MaxStartingOneHanders: number = 2;
    public static MinLevel: number = 1;
    public static MaxLevel: number = 10;
    public static MaxHands: number = 3;

    public id: string;
    public ownerId: string;
    public name: string;
    public created: Date;
    public kinship: Kinship;
    public level: number;
    public className: string;
    public enforceRules: boolean;
    public money: number;

    public adjustMaxHealth?: number;
    public overrideMaxHealth?: number;

    public currentHealth: number;
    public currentWounds: number;
    public juiced: boolean;

    public baseMovement: number;
    public movementAdjust: number;
    public movementOverride?: number;

    public customCompetencies: SortedSet<Competency>;
    public competencies: SortedSet<Competency>;
    public conditions: SortedSet<Condition>;

    public skills: SortedSet<Skill>;
    public rhetorics: SortedSet<Rhetoric>;
    public personalities: SortedSet<Personality>;
    public perks: SortedSet<Perk>;
    
    public bodySlots: ModSlot[];
    public bodyMods: Mod[];

    public held: SortedSet<Weapon>;
    public worn: SortedSet<Item>;
    public loose: SortedSet<Item>;

    public minions: SortedSet<Minion>;

    public get initializer(): CharacterInitializer {
        return {
            ...this,
            created: this.created.toISOString(),
            customCompetencies: this.customCompetencies.collection,
            competencies: this.competencies.collection,
            conditions: this.conditions.collection.map(c => c.id),
            skills: [...this.skills],
            perks: [...this.perks],
            rhetorics: [...this.rhetorics],
            personalities: [...this.personalities],
            minions: [...this.minions],

            bodySlots: [...this.bodySlots],
            bodyMods: [...this.bodyMods.map(m => m.initializer)],
            held: [...this.held].map(i => i.initializer),
            worn: [...this.worn].map(i => i.initializer),
            loose: [...this.loose].map(i => i.initializer),
        }
    }

    public get armor(): number {
        return this.equipment.sum(eq => eq.armor);
    }

    public get resilience(): number {
        return this.equipment.sum(eq => eq.resilience);
    }

    public get handsOccupied(): number {
        return this.held.collection.sum(h => h.totalHandsUsed);
    }

    public get maxHands(): number {
        return Character.MaxHands
            + this.equipment.sum(e => e.totalExtraHandsAvailable)
            + this.perks.collection.sum(p => p.handsAvailableModifier);
    }

    public getWornLimitForSlot(slotName: string): number {
        return WornLimits[slotName as keyof typeof WornLimits] ?? DefaultWornLimit;
    }

    public get modifiedRhetorics(): Rhetoric[] {
        return this.rhetorics.collection.map(rhetoric => new Rhetoric({
            ...rhetoric,
            adjustment: rhetoric.adjustment + this.coalesceValues(rhetoric.name)
        }));
    }

    public getRhetoricModifierValues(name: RhetoricName): SourcedValue[] {
        return this.getSourcedValues(name);
    }

    public getFinalRhetoricModifier(name: RhetoricName): number {
        return this.coalesceValues(name);
    }

    public getSkillModifierValues(skill: Skill): SourcedValue[] {
        return this.getSourcedValues(skill.name);
    }

    private get allValueModifiers(): ValueModifier[] {
        return CombineValueModifiers(this.skills.collection, this.worn.collection, this.perks.collection);
    }

    private get allTextModifiers(): TextModifier[] {
        return CombineTextModifiers(this.skills.collection, this.worn.collection, this.perks.collection);
    }

    public get maxHealth(): number {
        return 15 + (3 * this.level) + Math.max(this.coalesceValues('Health'), 1);
    }

    public get maxWounds(): number {
        return Math.max(this.coalesceValues('Wounds'), 1);
    }

    public get movement(): number {
        return Math.max(this.coalesceValues('Movement'), 6);
    }

    protected get skillPointsForLevel(): number {
        return this.level * Skill.PointsPerLevel;
    }
    
    public get skillPointsUsed(): number {
        return this.skills.collection.sum(s => s.pointsUsed);
    }

    public get remainingSkillPoints(): number {
        return Math.max(this.skillPointsForLevel - this.skillPointsUsed, 0);
    }

    public get rhetoricPointsForLevel(): number {
        return Math.floor(this.level * 1.5);
    }

    public getValueModifiers(valueType: ValueType): ValueModifier[] {
        return this.allValueModifiers.filter(vm => vm.valueType == valueType);
    }

    public getTextModifiers(valueType: ValueType): TextModifier[] {
        return this.allTextModifiers.filter(tm => tm.valueType == valueType);
    }

    private getSourcedValues(valueType: ValueType): SourcedValue[] {
        return this.getValueModifiers(valueType)
            .map(vm => ({ source: vm.source, value: vm.modify(this) }));
    }

    private coalesceValues(valueType: ValueType): number {
        return this.getValueModifiers(valueType)
            .map(vm => vm.modify(this))
            .reduce((accum: number, curr: number) => accum + curr, 0);
    }

    private coalesceText(valueType: ValueType): string[] {
        return this.getTextModifiers(valueType)
            .map(tm => tm.modify(this));
    }

    public get equipment(): Item[] {
        return [
            ...this.held.collection,
            ...this.worn.collection
        ];
    }

    /**
     * All items that aren't currently equipped.
     */
    public get unequipped(): Item[] {
        return [
            ...this.loose.collection,
            ...this.bodyMods,
        ]
    }

    /**
     * All items in the character's inventory: equipped, loose, or in a container, but not mods.
     */
    public get inventory(): Item[] {
        return [
            ...this.equipment,
            ...this.unequipped
        ];
    }

    public get allItems(): Item[] {
        const inventoryInstanceIds = this.inventory.map(i => i.instanceId);
        //The "unequipped" collection already contains items that are held by a container, so we want to avoid any duplicates here.
        const containedItems = [...this.inventory.mapMany(i => i.containedItems).filter(i => !inventoryInstanceIds.contains(i.instanceId))];
        return [...this.inventory, ...containedItems];
    }

    public get mods(): Mod[] {
        return this.inventory.filter<Mod>(isMod);
    }

    public getItemCollection(item: Item): ItemCollectionInfo | undefined {
        if (this.held.containsKey(item.instanceId)) {
            return { collection: 'Held' };
        }
        if (this.worn.containsKey(item.instanceId)) {
            return { collection: 'Worn' };
        }
        if (this.loose.containsKey(item.instanceId)) {
            return { collection: 'Loose' };
        }
    }

    public findItem(instanceId: string): Item | undefined {
        for (const item of this.inventory) {
            if (item.instanceId == instanceId) {
                return item;
            }
            const found = item.findItem(instanceId);
            if (found) {
                return found;
            }
        }
    }

    public removeItems(...instanceIds: string[]): Item[] {
        const items: Item[] = [];
        for (let instanceId of instanceIds) {
            const item = this.removeItem(instanceId);
            if (item != undefined) {
                items.push(item);
            }
        }
        return items;
    }

    public removeItem(instanceId: string): Item | undefined {
        return this.held.removeByKey(instanceId)
            || this.worn.removeByKey(instanceId)
            || this.loose.removeByKey(instanceId);
    }

    public couldHoldItem(weapon: Weapon, replaceWeapons: Weapon[] = []): boolean {
        const currentHandsUsed = this.held.collection
            .filter(held => !replaceWeapons.contains(held))
            .sum(held => held.totalHandsUsed);
        return currentHandsUsed + weapon.totalHandsUsed <= this.maxHands;
    }

    public couldWearItem(item: Item, replaceItems: Item[] = []): boolean {
        const currentlyWornToStillBeWorn = this.worn.collection
            .filter(worn => !replaceItems.contains(worn));
        for (let wornSlot of item.wornOn) {
            const wornOccupyingSlot = currentlyWornToStillBeWorn.count(cw => cw.wornOn.contains(wornSlot));
            const wornLimit = this.getWornLimitForSlot(wornSlot);
            if (wornOccupyingSlot >= wornLimit) {
                return false
            }
        }
        return item.wornOn.any();
    }

    public get actions(): CharacterAbility[] {
        const handAttacks = this.held.collection.mapMany(held => held.attacks);
        const handSpells = this.held.collection.mapMany(held => held.spells);
        const equipmentActions = this.worn.collection.mapMany(hand => hand.displayActions);
        const perkActions = this.perks.collection.mapMany(perk => perk.sourcedActions);
        const skillActions = this.skills.collection.mapMany(skill => skill.actions);
        
        const actions = [...handAttacks, ...handSpells, ...equipmentActions, ...perkActions, ...skillActions];
        return actions.sort(SortByName);
    }

    public get reactions(): CharacterAbility[] {
        const handReactions = this.held.collection.mapMany(hand => hand.displayReactions);
        const equipmentReactions = this.worn.collection.mapMany(hand => hand.displayReactions);
        const perkReactions = this.perks.collection.mapMany(perk => perk.sourcedReactions);
        const skillReactions = this.skills.collection.mapMany(skill => skill.reactions);

        const reactions = [...handReactions, ...equipmentReactions, ...perkReactions, ...skillReactions];
        return reactions.sort(SortByName);
    }

    public get passives(): CharacterAbility[] {
        const handPassives = this.held.collection.mapMany(hand => hand.displayPassives);
        const equipmentPassives = this.worn.collection.mapMany(worn => worn.displayPassives);
        const perkPassives = this.perks.collection.mapMany(perk => perk.sourcedPassives);
        const skillPassives = this.skills.collection.mapMany(skill => skill.passives);

        const passives = [...this.kinshipPassives, ...handPassives, ...equipmentPassives, ...perkPassives, ...skillPassives];
        return passives.sort(SortByName);
    }

    private get kinshipPassives(): CharacterAbility[] {
        if (this.bodyMods.any(bm => bm.tags.contains("Cyborg"))) {
            return [];
        }
        return [
            {
                id: 'd0921a5f-765a-461d-977c-7003d2ff043c',
                name: 'Living Biomass',
                type: 'Feature',
                description: "You're no machine! You are immune to hacking damage and the Malfunctioning condition.",
                source: this.kinship,
                tags: [],
            }
        ];
    }

    public get attacks(): CharacterAbility[] {
        return this.held.collection.mapMany(weapon => weapon.attacks);
    }

    public get spells(): CharacterAbility[] {
        return this.held.collection.mapMany(weapon => weapon.spells);
    }

    public get features(): CharacterAbility[] {
        const perkFeatures = this.perks.collection.mapMany(perk => perk.abilities);
        const skillFeatures = this.skills.collection.mapMany(skill => skill.abilities);
        return [...perkFeatures, ...skillFeatures].unique(GetCharacterAbilityKey);
    }
    
    public get maxHordeSize(): number {
        return this.coalesceValues("HordeSize");
    }
}