import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ActiveAbility } from "../../abilities/ActiveAbility";
import { ModifierContainer } from "../../character-modifiers/ModifierContainer";
import { TextModifier } from "../../character-modifiers/TextModifier";
import { ValueModifier } from "../../character-modifiers/ValueModifier";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { SkillRequirement } from "../skills/SkillRequirement";
import { OwnedReference } from "../../Ownership";
import { ObjectIcons } from "../../../components/icons";
import { CharacterAbility } from "../../abilities/Ability";

export interface PerkInitializer {
    id: string;
    name: string;
    description: string;
    icon: string;
    handsAvailableModifier: number;
    skillRequirements: SkillRequirement[];
    actions?: ActiveAbility[];
    reactions?: ReactiveAbility[];
    passives?: PassiveAbility[];
    tags: string[];
}

export const DefaultPerkInitializer: PerkInitializer = {
    id: '',
    name: '',
    description: '',
    icon: 'default',
    handsAvailableModifier: 0,
    skillRequirements: [],
    actions: [],
    reactions: [],
    passives: [],
    tags: []
}

export interface OwnedPerkInitializer extends PerkInitializer, OwnedReference { }

export class Perk implements OwnedPerkInitializer, ModifierContainer {
    public constructor(initializer: OwnedPerkInitializer) {
        this.id = initializer.id;
        this.instanceId = initializer.instanceId;
        this.name = initializer.name;
        this.description = initializer.description;
        this.icon = initializer.icon;
        this.handsAvailableModifier = initializer.handsAvailableModifier;
        this.skillRequirements = initializer.skillRequirements;

        this.actions = initializer.actions ?? [];
        this.reactions = initializer.reactions ?? [];
        this.passives = initializer.passives ?? [];

        this.tags = initializer.tags ?? [];

        this.saved = initializer.saved;
    }

    public readonly id: string;
    public instanceId: string;
    public readonly name: string;
    public readonly description: string;
    public readonly icon: string;
    public readonly handsAvailableModifier: number;
    public readonly skillRequirements: SkillRequirement[];
    public readonly actions: ActiveAbility[];
    public readonly reactions: ReactiveAbility[];
    public readonly passives: PassiveAbility[];
    public readonly tags: string[];

    public readonly valueModifiers: ValueModifier[] = [];
    public readonly textModifiers: TextModifier[] = [];
    public saved: boolean;

    public get iconElement(): JSX.Element {
        return <JSX.Element>ObjectIcons[this.icon as keyof typeof ObjectIcons] ?? ObjectIcons['default'];
    }

    public get sourcedActions(): CharacterAbility[] {
        return this.actions.map(a => ({ ...a, source: this.name }));
    }

    public get sourcedReactions(): CharacterAbility[] {
        return this.reactions.map(r => ({ ...r, source: this.name }));
    }

    public get sourcedPassives(): CharacterAbility[] {
        return this.passives.map(p => ({ ...p, source: this.name }));
    }

    public get abilities(): CharacterAbility[] {
        return [...this.actions, ...this.reactions, ...this.passives]
            .map(ability => ({
                ...ability,
                icon: this.iconElement
            }));
    }
}