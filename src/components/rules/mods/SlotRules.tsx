import React from "react";
import { ModInitializer } from "../../../entities/library/items/ItemInitializers";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive, Example } from "../../directives/Directives";
import { ModSlotPreview } from "../../collection/characters/character-tools/items/preview/mods/ModSlotPreview";
import { ModSlot } from "../../../entities/library/items/mods/ModSlot";
import { getUniqueIdentifier } from "../../../utils/GUID";
import { ItemPreview } from "../../collection/characters/character-tools/items/preview/ItemPreview";
import { ItemPreviewHeader } from "../../collection/characters/character-tools/items/preview/ItemPreviewHeader";
import { RecordStatus } from "../../../entities/RecordStatus";

export const SlotRulesNavLink = new ArticleNavLink({
    name: 'Slots',
    path: '#Slots',
    render: () => <SlotRules />
});

const sampleModSlot: ModSlot = {
    id: getUniqueIdentifier(),
    slotTypes: []
}

const sampleModSlotWithRequirements: ModSlot = {
    ...sampleModSlot,
    slotTypes: ["Chemistry", "Medicine"]
}

const sampleItemAssignableTo: ModInitializer = {
    id: getUniqueIdentifier(),
    name: "Example Item",
    description: "Mod details with an \"Assignable To\" section:",
    icon: "default",
    type: "Mod",
    cost: 0,
    weight: 0,
    inheritsHandTriggers: true,
    handsUsedModifier: 0,
    handsAvailableModifier: 0,
    skillsUsed: [],
    skillRequirements: [],
    handTriggers: [],
    damageSuite: [],
    customDamageTexts: [],
    actions: [],
    reactions: [],
    passives: [],
    wornOn: [],
    slots: [],
    tags: ["Example"],
    recordStatus: RecordStatus.Published,
    slotType: "",
    assignableToTags: ["Only Assignable To This Tag", "And Also This Tag"],
    blacklistTags: [],
}

const sampleItemNotAssignableTo = {
    ...sampleItemAssignableTo,
    description: "Mod details with a \"Not Assignable To\" section:",
    blacklistTags: ["Not Assignable To This Tag", "Not Assignable To This Tag Either"],
}

const SlotRules: React.FC = () => (
    <section id={SlotRulesNavLink.hash}>
        <h2>{SlotRulesNavLink.name}</h2>
        <p>
            In order to attach a mod to a piece of gear, it needs to go into a slot. Different types of gear will have different numbers of slots; some gear won't have any slots at all. The number of slots on a piece of gear are indicated by empty squares as seen below:
        </p>
        <Example>
            An empty mod slot:
            <br />
            <ModSlotPreview slot={sampleModSlot} />
        </Example>


        <p>
            Not just any mod can fit in any slot; some mods have restrictions. If a mod can only be assigned to certain types of items, it will list the tags of those items in a list under the <em>Assignable To</em> section. If there are no restrictions in the <em>Assignable To</em> section, then the mod can be slotted onto any item so long as the desired slot is a legal option. Below is an item which has some tags it is assignable to:
        </p>
        <Directive header={<ItemPreviewHeader item={sampleItemAssignableTo} />}>
            <ItemPreview item={sampleItemAssignableTo} />
        </Directive>


        <p>
            Some mods also have specific types of items that they cannot be assigned to. These are listed under the <em>Not Assignable To</em> section. See below for an example:
        </p>
        <Directive header={<ItemPreviewHeader item={sampleItemAssignableTo} />}>
            <ItemPreview item={sampleItemNotAssignableTo} />
        </Directive>
        

        <p>
            Below is a comprehensive list of when you can assign a mod to a slot; if any of the following are true, you can assign your mod to that slot: 
        </p>
        <ul>
            <li>
                The slot has no requirements and the mod has no requirements.
            </li>
            <li>
                The slot has no requirements, and the mod does not specify any "Assignable To" restrictions or the item it's being assigned to has one of the tags listed in the "Assignable To" section.
            </li>
            <li>
                The slot's tags contain the mod's tags.
            </li>
        </ul>
    </section>
);