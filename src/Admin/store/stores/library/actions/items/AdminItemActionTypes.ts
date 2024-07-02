import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";

export type AdminItemsLoaded = { type: 'ADMIN_ITEMS_LOADED', items: ItemInitializer[] };
export type AdminItemCreate = { type: 'ADMIN_ITEMS_CREATE', item: ItemInitializer };
export type AdminItemUpdate = { type: 'ADMIN_ITEMS_UPDATE', item: ItemInitializer };
export type AdminItemDelete = { type: 'ADMIN_ITEMS_DELETE', id: string };