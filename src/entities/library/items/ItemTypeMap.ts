import { OwnedCompetencyReference, OwnedModReference, OwnedReference } from "../../Ownership";
import { Container } from "./containers/Container";
import { Item } from "./Item";
import { ContainerInitializer, ItemInitializer, ItemTypeValue, ModInitializer, ModTypeValue, OwnedItemInitializer, OwnedModInitializer, OwnedWeaponInitializer, WeaponInitializer } from "./ItemInitializers";
import { Ammo } from "./mods/Ammo";
import { Mod } from "./mods/Mod";
import { ModConstructsMap, ModConstructsOwnedMap, ModMap } from "./mods/ModTypeMap";
import { Spell } from "./mods/Spell";
import { Weapon } from "./weapons/Weapon";

export const ItemMap = {
    'Item': Item,
    'Container': Container,
    'Weapon': Weapon,
    ...ModMap
};

export type InitializerConstructsType<T extends ItemInitializer> = T extends ModInitializer
    ? ModConstructsMap<T>
    : T extends WeaponInitializer
    ? Weapon
    : Item;

export type OwnedConstructsType<T extends OwnedItemInitializer> = T extends OwnedModInitializer
    ? ModConstructsOwnedMap<T>
    : T extends OwnedWeaponInitializer
    ? Weapon
    : Item;


export type ItemTypeKey = keyof typeof ItemMap;
export const ItemTypeKeys = Object.keys(ItemMap) as ItemTypeKey[];

export const ItemTypeValues: ItemTypeValue[] = ['Item', 'Weapon', 'Container', 'Mod', 'Ammo', 'Spell'];

export const IsItemTypeValue = (possibleType: string): possibleType is ItemTypeValue => {
    return ItemTypeValues.contains(possibleType);
}

export type ItemType = typeof ItemMap[ItemTypeKey];

        
export type ItemFromType<T extends ItemTypeValue> = T extends 'Item'
    ? Item
    : T extends 'Weapon'
    ? Weapon
    : T extends 'Container'
    ? Container
    : T extends 'Mod'
    ? Mod 
    : T extends 'Ammo'
    ? Ammo
    : Spell;