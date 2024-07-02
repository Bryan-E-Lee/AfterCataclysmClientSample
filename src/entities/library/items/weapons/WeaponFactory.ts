import { OwnedWeaponInitializer } from "../ItemInitializers";
import { Weapon } from "./Weapon";

export const WeaponFactory = Object.freeze({
    Create: (initializer: OwnedWeaponInitializer) => {
        return new Weapon(initializer);
    }
});