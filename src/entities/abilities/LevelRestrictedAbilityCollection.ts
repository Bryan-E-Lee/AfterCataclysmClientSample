import { Ability } from "./Ability";

export interface LevelRestrictedAbilityCollection<T extends Ability> {
    id: string;
    level: number;
    abilities: T[];
}