import { ActiveAbility } from "./ActiveAbility";
import { PassiveAbility } from "./PassiveAbility";
import { ReactiveAbility } from "./ReactiveAbility";

export interface AbilitiesByLevelCollection {
    level: number;
    activeAbilities: ActiveAbility[];
    passiveAbilities: PassiveAbility[];
    reactiveAbilities: ReactiveAbility[];
}