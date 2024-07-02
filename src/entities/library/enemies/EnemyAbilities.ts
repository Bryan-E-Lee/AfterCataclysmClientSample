import { SelectableOption } from "../../../components/inputs/selects/SelectableOption";
import { Ability } from "../../abilities/Ability";
import { ActiveAbility } from "../../abilities/ActiveAbility";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";

export type Complication = 'Legendary' | 'Big' | 'Small' | 'None';
const Complications: Complication[] = [
    'None',
    'Small',
    'Big',
    'Legendary',
];
export const ComplicationOptions: SelectableOption<Complication>[] = Complications.map(c => ({ name: c, value: c }));

type EnemyAbilityType = 'Action' | 'Reaction' | 'Passive' | 'Free';

type BaseEnemyAbility = {
    cost: Complication;
}

export type EnemyActiveAbility = BaseEnemyAbility & ActiveAbility;

export type EnemyReactiveAbility = BaseEnemyAbility & ReactiveAbility;

export type EnemyPassiveAbility = BaseEnemyAbility & PassiveAbility;

export type EnemyFreeAbility = BaseEnemyAbility & {
    abilityType: 'FreeAbility';
}

export type EnemyAbility = EnemyActiveAbility | EnemyReactiveAbility | EnemyPassiveAbility;

export function isEnemyAbility(ability: Ability): ability is EnemyAbility {
    return (<any>ability).cost != undefined;
}

export function isEnemyActiveAbility(ability: EnemyAbility): ability is EnemyActiveAbility {
    return ability.abilityType == 'ActiveAbility';
}

export function isEnemyReactiveAbility(ability: EnemyAbility): ability is EnemyReactiveAbility {
    return ability.abilityType == 'ReactiveAbility';
}

export function isEnemyPassiveAbility(ability: EnemyAbility): ability is EnemyPassiveAbility {
    return ability.abilityType == 'PassiveAbility';
}