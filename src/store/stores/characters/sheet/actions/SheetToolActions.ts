import { Character, CharacterInitializer } from "../../../../../entities/characters/Character";
import { ItemFilterInitializer } from "../../../../../entities/filters/ItemFilter";
import { DieFace } from "../../../../../entities/rolls/Roll";
import { SkillName } from "../../../../../entities/library/skills/SkillMap";
import { AppThunkAction } from "../../../ApplicationState";
import { CommunalDice } from "../../../../../entities/adventures/Adventure";

export type SheetSet = { type: 'SHEET_SET', character: CharacterInitializer }
export type SheetSetPreviewItemInstanceId = { type: 'SHEET_SET_PREVIEW_ITEM_INSTANCE_ID', instanceId?: string }
export type SheetSetPreviewSlotId = { type: 'SHEET_SET_PREVIEW_SLOT_ID', slotId?: string, slotItemInstanceId?: string }
export type SheetShowItemAdder = { type: 'SHEET_SHOW_ITEM_ADDER', addToContainerId?: string }
export type SheetHideItemAdder = { type: 'SHEET_HIDE_ITEM_ADDER' }
export type SheetFilterItems = { type: 'SHEET_FILTER_ITEMS', filter: ItemFilterInitializer }
export type SheetRollHand = { type: 'SHEET_ROLL_HAND' }
export type SheetSetRoll = { type: 'SHEET_SET_ROLL', index: number, face: DieFace }
export type SheetSetCommunalRolls = { type: 'SHEET_SET_COMMUNAL_ROLLS', communalRolls: CommunalDice }
export type SheetSetRollSkill = { type: 'SHEET_SET_ROLL_SKILL', rollSkill: SkillName }
export type SheetClearRollSkill = { type: 'SHEET_CLEAR_ROLL_SKILL' }
export type SheetReroll = { type: 'SHEET_REROLL', character: Character, indices: number[] }
export type SheetKeepRolls = { type: 'SHEET_KEEP_ROLLS', character: Character }

export type SheetToolAction = SheetSet
    | SheetSetPreviewItemInstanceId
    | SheetSetPreviewSlotId
    | SheetShowItemAdder
    | SheetHideItemAdder
    | SheetFilterItems
    | SheetRollHand
    | SheetSetRoll
    | SheetSetCommunalRolls
    | SheetSetRollSkill
    | SheetClearRollSkill
    | SheetReroll
    | SheetKeepRolls;

export const SheetToolActions = {    
    setActiveCharacterSheet: (character: CharacterInitializer): AppThunkAction<SheetSet> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_SET', character: character });
        },

    setPreviewItem: (instanceId: string): AppThunkAction<SheetSetPreviewItemInstanceId> => 
        (dispatch, getState) => {
            const {previewItemInstanceId} = getState().sheet;
            if (previewItemInstanceId != instanceId) {
                dispatch({ type: 'SHEET_SET_PREVIEW_ITEM_INSTANCE_ID', instanceId })
            }
        },
    
    clearPreviewItem: (): AppThunkAction<SheetSetPreviewItemInstanceId> =>
        (dispatch, getState) => {
            const {previewItemInstanceId} = getState().sheet;
            if (previewItemInstanceId != undefined) {
                dispatch({ type: 'SHEET_SET_PREVIEW_ITEM_INSTANCE_ID' });
            }
        },

    setPreviewSlot: (slotId: string, slotItemInstanceId: string): AppThunkAction<SheetSetPreviewSlotId> =>
        (dispatch, getState) => {
            const { previewSlotId } = getState().sheet;
            if (previewSlotId != slotId) {
                dispatch({ type: 'SHEET_SET_PREVIEW_SLOT_ID', slotId, slotItemInstanceId });
            }
        },

    clearPreviewSlot: (): AppThunkAction<SheetSetPreviewSlotId> =>
        (dispatch, getState) => {
            const { previewSlotId } = getState().sheet;
            if (previewSlotId != undefined) {
                dispatch({ type: 'SHEET_SET_PREVIEW_SLOT_ID' });
            }
        },

    showItemAdder: (addToContainerId?: string): AppThunkAction<SheetShowItemAdder> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_SHOW_ITEM_ADDER', addToContainerId });
        },

    hideItemAdder: (): AppThunkAction<SheetHideItemAdder> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_HIDE_ITEM_ADDER' });
        },

    filterItems: (filter: ItemFilterInitializer): AppThunkAction<SheetFilterItems> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_FILTER_ITEMS', filter });
        },
    
    rollHand: (): AppThunkAction<SheetRollHand> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_ROLL_HAND' });
        },

    setRoll: (index: number, face: DieFace): AppThunkAction<SheetSetRoll> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_SET_ROLL', index, face })
        },

    setCommunalRolls: (communalRolls: CommunalDice): AppThunkAction<SheetSetCommunalRolls> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_SET_COMMUNAL_ROLLS', communalRolls });
        },

    setRollSkill: (rollSkill: SkillName): AppThunkAction<SheetSetRollSkill> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_SET_ROLL_SKILL', rollSkill });
        },
    
    clearRollSkill: (): AppThunkAction<SheetClearRollSkill> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_CLEAR_ROLL_SKILL' });
        },

    reroll: (character: Character, indices: number[]): AppThunkAction<SheetReroll> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_REROLL', character, indices });
        },

    keepHand: (character: Character): AppThunkAction<SheetKeepRolls> =>
        (dispatch) => {
            dispatch({ type: 'SHEET_KEEP_ROLLS', character });
        },
}