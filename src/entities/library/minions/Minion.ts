import { AbilitiesByLevelCollection } from "../../abilities/AbilitiesByLevelCollection";
import { ActiveAbility } from "../../abilities/ActiveAbility";
import { Ability } from "../../abilities/Ability";
import { LevelRestrictedAbilityCollection } from "../../abilities/LevelRestrictedAbilityCollection";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { Character } from "../../characters/Character";
import { CreatureType } from "../../characters/CreatureType";
import { OwnedMinionReference } from "../../Ownership";

export interface MinionInitializer {
    id: string;
    name: string;
    description: string;
    creatureTypes: CreatureType[];
    baseHealth: number;
    healthScale: number;
    armor: number;
    resilience: number;
    featuresByLevel: AbilitiesByLevelCollection[];
}

export const DefaultMinionInitializer: MinionInitializer = {
    id: '',
    name: '',
    description: '',
    creatureTypes: [],
    baseHealth: 1,
    healthScale: 1,
    armor: 0,
    resilience: 0,
    featuresByLevel: [],
}

export interface OwnedMinionInitializer extends MinionInitializer, OwnedMinionReference { }

export class Minion implements OwnedMinionInitializer {
    public constructor(initializer: OwnedMinionInitializer) {
        this.id = initializer.id;
        this.instanceId = initializer.instanceId;
        this.name = initializer.name;
        this.customName = initializer.customName;
        this.description = initializer.description;
        this.customNotes = initializer.customNotes;
        this.creatureTypes = initializer.creatureTypes;

        this.currentHealth = initializer.currentHealth;
        this.baseHealth = initializer.baseHealth;
        this.healthScale = initializer.healthScale;
        this.armor = initializer.armor;
        this.resilience = initializer.resilience;
        this.featuresByLevel = initializer.featuresByLevel.sort(
            (sk1, sk2) => sk1.level - sk2.level
        );
        
        this.saved = initializer.saved;
    }

    public readonly id: string;
    public instanceId: string;
    public readonly name: string;
    public readonly customName?: string; 
    public readonly description: string;
    public readonly customNotes?: string;
    public readonly creatureTypes: CreatureType[];
    public currentHealth: number;
    public readonly baseHealth: number;
    public readonly healthScale: number;
    public readonly armor: number;
    public readonly resilience:  number;
    public readonly featuresByLevel: AbilitiesByLevelCollection[];
    public saved: boolean;

    public get displayName(): string {
        return this.customName
            ? `${this.customName} (${this.name})`
            : this.name;
    }

    public get displayDescription(): string {
        return this.customNotes ?? this.description;
    }

    public get displayCreatureTypes(): string {
        return this.creatureTypes.join(', ');
    }

    public getMaxHealth(character: Character): number {
        const commandSkillLevel = this.getCharacterCommandSkillLevel(character);
        return this.baseHealth + this.healthScale * commandSkillLevel;
    }

    public getAcquiredFeatures(level: number): AbilitiesByLevelCollection[] {
        return this.featuresByLevel.filter(skf => skf.level <= level);
    }

    public getActionsForLevel = (character: Character): ActiveAbility[] =>
        this.getAcquiredFeatures(character.level).mapMany(sf => sf.activeAbilities
            .map(a => ({ ...a, source: `${this.name} ${sf.level}` }))
        );

    public getReactionsForLevel = (character: Character): ReactiveAbility[] =>
        this.getAcquiredFeatures(character.level).mapMany(sf => sf.reactiveAbilities
            .map(a => ({ ...a, source: `${this.name} ${sf.level}` }))
        );

    public getPassivesForLevel = (character: Character): PassiveAbility[] =>
        this.getAcquiredFeatures(character.level).mapMany(sf => sf.passiveAbilities
            .map(a => ({ ...a, source: `${this.name} ${sf.level}` }))
        );

    private getCharacterCommandSkillLevel(character: Character): number {
        return character.skills.get('Command')?.adjustedLevel ?? 0;
    }
}