import { ItemFilter } from "../../../../../entities/filters/ItemFilter";
import { DieFace, Hand } from "../../../../../entities/rolls/Roll"
import { Skill } from "../../../../../entities/library/skills/Skill";
import {SheetFilterItems, SheetKeepRolls, SheetReroll, SheetRollHand, SheetSet, SheetSetCommunalRolls, SheetSetPreviewItemInstanceId, SheetSetPreviewSlotId, SheetSetRoll, SheetSetRollSkill, SheetShowItemAdder } from "../actions/SheetToolActions"
import { SheetState } from "../Sheet.State"

const setSheet = (state: SheetState, action: SheetSet): SheetState => ({
    ...state, ...action.character
});

const previewItem = (state: SheetState, action: SheetSetPreviewItemInstanceId): SheetState => ({
    ...state, previewItemInstanceId: action.instanceId
});

const previewSlot = (state: SheetState, action: SheetSetPreviewSlotId): SheetState => ({
    ...state, previewSlotId: action.slotId, previewSlotItemInstanceId: action.slotItemInstanceId
})

const showItemAdder = (state: SheetState, action: SheetShowItemAdder): SheetState => ({
    ...state,
    showItemAdder: true,
    addToContainerId: action.addToContainerId
});

const hideItemAdder = (state: SheetState): SheetState => ({
    ...state, showItemAdder: false, addToContainerId: undefined, itemFilter: ItemFilter.GetDefaultInitializer()
});

const filterItems = (state: SheetState, action: SheetFilterItems): SheetState => ({
    ...state, itemFilter: action.filter
});

const rollHand = (state: SheetState, action: SheetRollHand): SheetState => ({
    ...state,
    hand: [...Hand.CreateRandomHand().rolls]
});

const setRoll = (state: SheetState, action: SheetSetRoll) => {
    const newHand = [...state.hand];
    newHand.splice(action.index, 1, action.face);
    return {
        ...state,
        hand: newHand
    };
}

const reroll = (state: SheetState, action: SheetReroll): SheetState => {
    const { rollSkill } = state;
    const { character, indices } = action;
    const skill = character.skills.collection.find(skill => skill.name == rollSkill);
    if (skill == undefined) {
        console.error('Attempted to reroll for nonexistent skill.');
        return state;
    }

    let newHand = [...state.hand];
    for (let index of indices) {
        newHand.splice(index, 1, Hand.GetRandomDieFace());
    }
    newHand = [...newHand, ...rollExtraDice(skill)];
    return {
        ...state,
        hand: newHand 
    }
}

const keep = (state: SheetState, action: SheetKeepRolls): SheetState => {
    const { rollSkill } = state;
    const { character } = action;
    const skill = character.skills.collection.find(skill => skill.name == rollSkill);
    if (skill == undefined) {
        console.error('Attempted to keep hand for nonexistent skill.');
        return state;
    }

    return {
        ...state,
        hand: [...state.hand, ...rollExtraDice(skill)]
    }
}

const rollExtraDice = (skill: Skill): DieFace[] => {
    const extraRolls = skill.roller.extraRolls;
    const newRolls: DieFace[] = []
    for (let i = 0; i < extraRolls; i++) {
        newRolls.push(Hand.GetRandomDieFace());
    }
    return newRolls;
}

const setCommunalRolls = (state: SheetState, action: SheetSetCommunalRolls): SheetState => ({
    ...state,
    communalRolls: [...action.communalRolls.slice(0, 2)]
})

const setRollSkill = (state: SheetState, action: SheetSetRollSkill): SheetState => ({
    ...state,
    rollSkill: action.rollSkill
})

const clearRollSkill = (state: SheetState): SheetState => ({
    ...state,
    rollSkill: undefined
})

export const SheetToolReducers = {
    setSheet,
    previewItem,
    previewSlot,
    showItemAdder,
    hideItemAdder,
    filterItems,
    rollHand,
    setRoll,
    setCommunalRolls,
    setRollSkill,
    clearRollSkill,
    reroll,
    keep,
}