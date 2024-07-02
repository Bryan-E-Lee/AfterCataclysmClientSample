import { ActiveAbility } from "../../abilities/ActiveAbility";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { OwnedReference } from "../../Ownership";

export interface PersonalityInitializer {
    id: string;
    name: string;
    description: string;
    activeAbilities: ActiveAbility[];
    reactiveAbilities: ReactiveAbility[];
    passiveAbilities: PassiveAbility[];
    positive: boolean;
}

export const DefaultPersonalityInitializer: PersonalityInitializer = {
    id: '',
    name: '',
    description: '',
    activeAbilities: [],
    reactiveAbilities: [],
    passiveAbilities: [],
    positive: true
}

export interface OwnedPersonalityInitializer extends PersonalityInitializer, OwnedReference { }

export class Personality implements OwnedPersonalityInitializer {
    public constructor(initializer: OwnedPersonalityInitializer) {
        this.id = initializer.id;
        this.instanceId = initializer.instanceId
        this.name = initializer.name;
        this.description = initializer.description;
        this.activeAbilities = initializer.activeAbilities;
        this.reactiveAbilities = initializer.reactiveAbilities;
        this.passiveAbilities = initializer.passiveAbilities;
        this.positive = initializer.positive;
        this.saved = initializer.saved;
    }

    public readonly id: string;
    public instanceId: string;
    public readonly name: string;
    public readonly description: string;
    public readonly activeAbilities: ActiveAbility[];
    public readonly reactiveAbilities: ReactiveAbility[];
    public readonly passiveAbilities: PassiveAbility[];
    public readonly positive: boolean;
    public saved: boolean;
}