import { CharacterInitializer } from "../../../../entities/characters/Character";
import { ItemFilter, ItemFilterInitializer } from "../../../../entities/filters/ItemFilter";
import { DieFace } from "../../../../entities/rolls/Roll";
import { SkillName } from "../../../../entities/library/skills/SkillMap";
import { ApplicationStorage } from "../../../storage/AppStorage";
import { CommunalDice } from "../../../../entities/adventures/Adventure";

export type SheetState = CharacterInitializer & {
    addToContainerId?: string;
    previewItemInstanceId?: string;
    previewSlotId?: string;
    previewSlotItemInstanceId?: string;
    showItemAdder: boolean;
    itemFilter: ItemFilterInitializer;
    hand: DieFace[];
    communalRolls: CommunalDice;
    rollSkill?: SkillName;
    enforceRules: boolean;
    pendingProperties: { [key: string]: boolean } //Can't use map because state is immutable
}

export const SheetDefaultState: SheetState = {
    id: '',
    ownerId: '',
    name: '',
    created: new Date().toISOString(),
    kinship: 'Human',
    level: 1,
    className: 'Adventurer',
    baseMovement: 6,
    movementAdjust: 0,
    money: 0,
    
    currentHealth: 0,
    currentWounds: 0,
    juiced: true,

    competencies: [],
    customCompetencies: [],
    conditions: [],
    skills: [],
    rhetorics: [],
    personalities: [],
    perks: [],

    bodySlots: [],
    bodyMods: [],

    held: [],
    worn: [],
    loose: [],

    minions: [],

    showItemAdder: false,
    itemFilter: ItemFilter.GetDefaultInitializer(),
    hand: [],
    communalRolls: [1, 1],

    enforceRules: ApplicationStorage.enforceRules,

    pendingProperties: {},
};