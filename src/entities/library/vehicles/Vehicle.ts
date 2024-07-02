import { ActiveAbility } from "../../abilities/ActiveAbility";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { ObjectSize } from "../common/ObjectSize";
import { Occupancy } from "./Occupancy";

export type Vehicle = {
    id: string;
    name: string;
    description: string;
    movement: number;
    health: number;
    healthScale: number;
    weight: number;
    armor: number;
    resilience: number;
    size: ObjectSize;
    occupancies: Occupancy[];
    actions: ActiveAbility[];
    reactions: ReactiveAbility[];
    passives: PassiveAbility[];
    tags: string[];
}

export const DefaultVehicle: Vehicle = {
    id: "",
    name: "",
    description: "",
    movement: 0,
    health: 0,
    healthScale: 0,
    weight: 0,
    armor: 0,
    resilience: 0,
    size: ObjectSize.Medium,
    occupancies: [],
    actions: [],
    reactions: [],
    passives: [],
    tags: [],
}