import { RecordStatus } from "../../RecordStatus";
import { EnemyActiveAbility, EnemyPassiveAbility, EnemyReactiveAbility } from "./EnemyAbilities";

export type Enemy = {
    id: string;
    name: string;
    description: string;
    level: number;
    health: number;
    healthScale: number;
    armor: number;
    resilience: number;
    empowerment: number;
    movement: number;
    activeAbilities: EnemyActiveAbility[];
    reactiveAbilities: EnemyReactiveAbility[];
    passiveAbilities: EnemyPassiveAbility[];
    commonActiveAbilities: string[];
    commonReactiveAbilities: string[];
    commonPassiveAbilities: string[];
    tags: string[];
    recordStatus: RecordStatus;
}

export const DefaultEnemy: Enemy = {
    id: '',
    name: '',
    description: '',
    level: 1,
    health: 1,
    healthScale: 0,
    armor: 0,
    resilience: 0,
    empowerment: 1,
    movement: 6,
    activeAbilities: [],
    reactiveAbilities: [],
    passiveAbilities: [],
    commonActiveAbilities: [],
    commonReactiveAbilities: [],
    commonPassiveAbilities: [],
    tags: [],
    recordStatus: RecordStatus.Published,
}