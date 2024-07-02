import { Container } from "../../../entities/library/items/containers/Container";
import { Item } from "../../../entities/library/items/Item";
import { Mod } from "../../../entities/library/items/mods/Mod";
import { Weapon } from "../../../entities/library/items/weapons/Weapon";
import { AppThunkAction } from "../ApplicationState";

export type TooltipClear = { type: 'TOOLTIP_CLEAR' }
export type TooltipSetMod = { type: 'TOOLTIP_SET_MOD', mod: Mod }
export type TooltipSetItem = { type: 'TOOLTIP_SET_ITEM', item: Item }
export type TooltipSetContainer = { type: 'TOOLTIP_SET_CONTAINER', container: Container };
export type TooltipSetWeapon = { type: 'TOOLTIP_SET_WEAPON', weapon: Weapon }

export type TooltipAction = TooltipClear
    | TooltipSetMod
    | TooltipSetItem
    | TooltipSetContainer
    | TooltipSetWeapon;

export const TooltipActions = {
    clear: (): AppThunkAction<TooltipClear> => (dispatch, getState) => {
        dispatch({ type: 'TOOLTIP_CLEAR' });
    },
    setMod: (mod: Mod): AppThunkAction<TooltipSetMod> => (dispatch, getState) => {
        dispatch({ type: 'TOOLTIP_SET_MOD', mod });
    },
    setItem: (item: Item): AppThunkAction<TooltipSetItem> => (dispatch, getState) => {
        dispatch({ type: 'TOOLTIP_SET_ITEM', item });
    },
    setContainer: (container: Container): AppThunkAction<TooltipSetContainer> => (dispatch, getState) => {
        dispatch({ type: 'TOOLTIP_SET_CONTAINER', container });
    },
    setWeapon: (weapon: Weapon): AppThunkAction<TooltipSetWeapon> => (dispatch, getState) => {
        dispatch({ type: 'TOOLTIP_SET_WEAPON', weapon });
    }
}