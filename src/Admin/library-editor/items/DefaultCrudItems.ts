import { RecordStatus } from "../../../entities/RecordStatus";
import { ContainerInitializer, CrudItemInitializer, CrudModInitializer, ItemInitializer, ModInitializer, WeaponInitializer } from "../../../entities/library/items/ItemInitializers";
import { getUniqueIdentifier } from "../../../utils/GUID";

export const DefaultItemInitializer: CrudItemInitializer<ItemInitializer> = Object.freeze({
    id: getUniqueIdentifier(),
    name: '',
    type: 'Item',
    description: '',
    icon: 'default',
    skillsUsed: [],
    skillRequirements: [],
    handTriggers: [],
    cost: 0,
    weight: 0,
    handsUsedModifier: 0,
    handsAvailableModifier: 0,
    actions: [],
    reactions: [],
    passives: [],
    wornOn: [],
    slots: [],
    tags: [],
    blacklistTags: [],
    newTags: [],
    recordStatus: RecordStatus.Published
});

export const DefaultWeaponInitializer: CrudItemInitializer<WeaponInitializer> = Object.freeze({
    ...DefaultItemInitializer,
    type: 'Weapon',
    weaponType: '',
    hands: 1,
    range: 0
})

export const DefaultContainerInitializer: CrudItemInitializer<ContainerInitializer> = Object.freeze({
    ...DefaultItemInitializer,
    type: 'Container',
    allowedTags: []
})

export const DefaultModInitializer: CrudModInitializer<ModInitializer> = Object.freeze({
    ...DefaultItemInitializer,
    slotType: '',
    inheritsHandTriggers: true,
    damageSuite: [],
    customDamageTexts: [],
    assignableToTags: [],
    newAssignableToTags: []
});