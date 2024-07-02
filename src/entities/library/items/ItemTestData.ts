import { ActiveAbility } from "../../abilities/ActiveAbility";
import { PassiveAbility } from "../../abilities/PassiveAbility";
import { ReactiveAbility } from "../../abilities/ReactiveAbility";
import { OwnedItemInitializer, OwnedModInitializer } from "./ItemInitializers";

export const ItemTestInitializer: OwnedItemInitializer = {
    id: 'id',
    instanceId: 'instanceid',
    type: 'Item',

    name: 'name',
    description: 'description',
    icon: 'default',
    explicitType: undefined,

    cost: 1,
    weight: 2,

    armor: 3,
    resilience: 4,

    handsUsedModifier: 0,
    handsAvailableModifier: 0,

    wornOn: [],
    skillsUsed: [],
    skillRequirements: [],
    handTriggers: [],

    actions: [],
    reactions: [],
    passives: [],

    mods: [],
    slots: [],
    tags: [],

    saved: true
};

export const TestActions: ActiveAbility[] = [
    {
        id: 'action1',
        name: 'action1',
        description: 'actiondescription1',
        abilityType: 'ActiveAbility',
        type: 'Attack',
        skillsUsed: ['Athletics'],
        damageSuite: [
            { damageType: 'Percussive', quantity: 1 },
            { damageType: 'Thermal', quantity: 2 }
        ],
        handTriggers: [
            {
                handTypes: ['Flush','Full House'],
                description: 'handTriggerDescription1'
            }
        ]
    },
    {
        id: 'action2',
        name: 'action2',
        description: 'actiondescription2',
        abilityType: 'ActiveAbility',
        type: 'Interact',
        range: 3,
        skillsUsed: ['Command'],
        damageSuite: [
            { damageType: 'Electromagnetic', quantity: 3 }
        ],
        handTriggers: [
            {
                handTypes: ['Two Pair','Quad'],
                description: 'handTriggerDescription2'
            }
        ]
    }
];

export const TestReactions: ReactiveAbility[] = [
    {
        id: 'reactionId1',
        name: 'reaction1',
        type: 'Feature',
        description: 'reactionDescription1',
        abilityType: 'ReactiveAbility',
        triggerCondition: 'reactionCondition1',
        damageSuite: [
            { damageType: 'Percussive', quantity: 1 },
            { damageType: 'Thermal', quantity: 2 }
        ]
    },
    {
        id: 'reactionId2',
        name: 'reaction2',
        type: 'Feature',
        description: 'reactionDescription2',
        abilityType: 'ReactiveAbility',
        triggerCondition: 'reactionCondition2',
        range: 2
    }
];

export const TestPassives: PassiveAbility[] = [
    {
        id: 'passiveId1',
        name: 'passive1',
        type: 'Feature',
        description: 'reactionDescription1',
        abilityType: 'PassiveAbility'
    },
    {
        id: 'passiveId2',
        name: 'passive2',
        type: 'Feature',
        description: 'passiveDescription2',
        abilityType: 'PassiveAbility'
    }
];

export const TestTags: string[] = [
    'tag1',
    'tag2',
    'tag3'
];

export const TestMods: OwnedModInitializer[] = [
    {
        id: 'modid1',
        instanceId: 'modinstanceid1',
        type: 'Mod',
    
        name: 'mod1',
        description: 'moddescription1',
        icon: 'default',
        explicitType: undefined,
    
        slotType: 'st1',
        assignableToTags: [],

        cost: 1,
        weight: 2,

        handsUsedModifier: 0,
        handsAvailableModifier: 0,

        damageSuite: [],
    
        wornOn: [],
        skillsUsed: [],
        skillRequirements: [],
        handTriggers: [],
    
        actions: [],
        reactions: [],
        passives: [],
    
        mods: [],
        slots: [],
        tags: [],
    
        saved: true
    },
    {
        id: 'modid2',
        instanceId: 'modinstanceid2',
        type: 'Ammo',
    
        name: 'mod2',
        description: 'moddescription2',
        icon: 'default',
        explicitType: undefined,
    
        slotType: 'st2',
        assignableToTags: [],

        cost: 1,
        weight: 2,

        handsUsedModifier: 0,
        handsAvailableModifier: 0,

        damageSuite: [],
    
        wornOn: [],
        skillsUsed: [],
        skillRequirements: [],
        handTriggers: [],
    
        actions: [],
        reactions: [],
        passives: [],
    
        mods: [],
        slots: [],
        tags: [],
    
        saved: true
    },
    {
        id: 'modid3',
        instanceId: 'modinstanceid3',
        type: 'Spell',
    
        name: 'mod3',
        description: 'moddescription3',
        icon: 'default',
        explicitType: undefined,
    
        slotType: 'st3',
        assignableToTags: [],

        cost: 1,
        weight: 2,

        handsUsedModifier: 0,
        handsAvailableModifier: 0,

        damageSuite: [],
    
        wornOn: [],
        skillsUsed: [],
        skillRequirements: [],
        handTriggers: [],
    
        actions: [],
        reactions: [],
        passives: [],
    
        mods: [],
        slots: [],
        tags: [],
    
        saved: true
    }
];

export const TestModActions: ActiveAbility[] = [
    {
        id: 'action4',
        name: 'action4',
        description: 'actiondescription4',
        abilityType: 'ActiveAbility',
        type: 'Attack',
        range: 1,
        skillsUsed: ['Athletics'],
        damageSuite: [
            { damageType: 'Percussive', quantity: 4 },
            { damageType: 'Thermal', quantity: 1 }
        ],
        handTriggers: [
            {
                handTypes: ['Flush','Triple'],
                description: 'handTriggerDescription1'
            }
        ]
    },
    {
        id: 'action3',
        name: 'action3',
        description: 'actiondescription3',
        abilityType: 'ActiveAbility',
        type: 'Interact',
        skillsUsed: ['Command'],
        damageSuite: [
            { damageType: 'Corrosive', quantity: 5 }
        ],
        handTriggers: [
            {
                handTypes: ['Pair','Full House'],
                description: 'handTriggerDescription2'
            }
        ]
    }
];