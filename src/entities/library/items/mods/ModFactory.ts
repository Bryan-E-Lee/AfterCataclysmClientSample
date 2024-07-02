import { isAmmoInitializer, isSpellInitializer, OwnedModInitializer } from "../ItemInitializers";
import { Ammo } from "./Ammo";
import { Mod } from "./Mod";
import { Spell } from "./Spell";

export class ModFactory {
    public static Create(initializer: OwnedModInitializer): Mod {
        let mod: Mod;
        if(isAmmoInitializer(initializer)) {
            mod = new Ammo(initializer);
        }
        else if(isSpellInitializer(initializer)) {
            mod = new Spell(initializer);
        }
        else {
            mod = new Mod(initializer);
        }
        
        if (!mod.mods.any()) {
            mod.mods = initializer.mods?.map(mod => ModFactory.Create(mod)) ?? [];
        }

        return mod;
    }
}