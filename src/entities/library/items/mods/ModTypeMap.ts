import { ModInitializer, AmmoInitializer, SpellInitializer, OwnedModInitializer, OwnedAmmoInitializer, OwnedSpellInitializer } from "../ItemInitializers";
import { Ammo } from "./Ammo";
import { Mod } from "./Mod";
import { Spell } from "./Spell";

export const ModMap = {
    'Mod': Mod,
    'Ammo': Ammo,
    'Spell': Spell
}
export type ModConstructsMap<T extends ModInitializer> = T extends AmmoInitializer
    ? Ammo
    : T extends SpellInitializer
    ? Spell
    : Mod;

export type ModConstructsOwnedMap<T extends OwnedModInitializer> = T extends OwnedAmmoInitializer
    ? Ammo
    : T extends OwnedSpellInitializer
    ? Spell
    : Mod;
    

export type ModKey = keyof typeof ModMap;

export type ModType = typeof ModMap[ModKey];