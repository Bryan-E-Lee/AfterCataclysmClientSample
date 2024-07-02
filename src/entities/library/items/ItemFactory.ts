import { ContainerFactory } from './containers/ContainerFactory';
import { ExplicitItemMap } from './ExplicitItemMap';
import { Item } from './Item';
import { isOwnedContainerInitializer, isOwnedModInitializer, isOwnedWeaponInitializer, OwnedItemInitializer } from './ItemInitializers';
import { InitializerConstructsType, OwnedConstructsType } from './ItemTypeMap';
import { ModFactory } from './mods/ModFactory';
import { Spell } from './mods/Spell';
import { WeaponFactory } from './weapons/WeaponFactory';

export const ItemFactory = {
    CreateUnknown: (initializer: OwnedItemInitializer): Item => {
        let item: Item;
        if(initializer == null) {
            throw 'Requested construction on a null item initializer.';
        }
        else if(isOwnedWeaponInitializer(initializer)) {
            item = WeaponFactory.Create(initializer);
        }
        else if(isOwnedModInitializer(initializer)) {
            item = ModFactory.Create(initializer);
        }
        else if(initializer.explicitType != null) {
            item = new ExplicitItemMap[initializer.explicitType](initializer);
        }
        else {
            item = new Item(initializer);
        }
        
        if (!item.mods.any()) {
            item.mods = initializer.mods?.map(mod => ModFactory.Create(mod)) ?? [];
        }
        return item;
    },
};