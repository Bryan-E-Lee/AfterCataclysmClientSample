import { Container } from "../../../entities/library/items/containers/Container";
import { Item } from "../../../entities/library/items/Item";
import { Mod } from "../../../entities/library/items/mods/Mod";
import { Weapon } from "../../../entities/library/items/weapons/Weapon";

export interface TooltipState {
    activeMod?: Mod;
    activeItem?: Item;
    activeContainer?: Container;
    activeWeapon?: Weapon;
}