import { ActiveAbility } from "./ActiveAbility"
import { PassiveAbility } from "./PassiveAbility";
import { ReactiveAbility } from "./ReactiveAbility";

export type AbilityContainer = {
    activeAbilities?: ActiveAbility[];
    reactiveAbilities?: ReactiveAbility[];
    passiveAbilities?: PassiveAbility[];
}