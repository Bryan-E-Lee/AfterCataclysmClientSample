import { Character } from "../../characters/Character";
import { OwnedRhetoricReference } from "../../Ownership";
import { Rollable, Roller } from "../Roller";
import { RhetoricName } from "./RhetoricMap";

export enum RhetoricPriority {
    None = 0,
    Primary = 1,
    Secondary = 2,
    Tertiary = 3
}

export interface RhetoricInitializer {
    id: string;
    name: RhetoricName;
    description: string;
}

export const DefaultRhetoricInitializer: RhetoricInitializer = {
    id: '',
    name: 'Charisma',
    description: ''
}

export interface OwnedRhetoricInitializer extends RhetoricInitializer, OwnedRhetoricReference { }

export class Rhetoric implements OwnedRhetoricInitializer, Rollable {
    public constructor(initializer: OwnedRhetoricInitializer) {
        this.id = initializer.id;
        this.instanceId = initializer.instanceId;
        this.name = initializer.name;
        this.description = initializer.description;
        this.priority = initializer.priority;
        this.adjustment = initializer.adjustment;
        this.override = initializer.override;
        this.saved = initializer.saved;
    }
    
    public readonly id: string;
    public readonly instanceId: string;
    public readonly name: RhetoricName;
    public readonly description: string;
    public priority: RhetoricPriority;
    public adjustment: number;
    public override?: number;
    public saved: boolean;

    public static readonly MinValue = 1;
    public static readonly MaxValue = 10;

    public getLevel(character: Character): number | undefined {
        const levelMod = character.getFinalRhetoricModifier(this.name);
        let baseLevel: number;
        switch (this.priority) {
            case RhetoricPriority.Primary:
                baseLevel = this.getPrimaryLevel(character.level) + levelMod;
                break;
            case RhetoricPriority.Secondary:
                baseLevel = this.getSecondaryLevel(character.level) + levelMod;
                break;
            case RhetoricPriority.Tertiary:
                baseLevel = this.getTertiaryLevel(character.level) + levelMod;
                break;
            default:
                return undefined;
        }
        return baseLevel + levelMod;
    }

    private getPrimaryLevel(characterLevel: number): number {
        return 1 + Math.ceil(characterLevel * 0.33);
    }

    private getSecondaryLevel(characterLevel: number): number {
        return Math.ceil(characterLevel * 0.25);
    }

    private getTertiaryLevel(characterLevel: number): number {
        return Math.ceil(characterLevel * 0.2);
    }

    public getRoller(character: Character): Roller {
        const level = this.getLevel(character) ?? 0;
        return new Roller(level * 2);
    }
}