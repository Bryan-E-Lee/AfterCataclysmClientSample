import { Action, Reducer } from "redux";
import { TooltipAction } from "./TooltipStore.Actions";
import { TooltipState } from "./TooltipStore.State";

export const TooltipReducer: Reducer<TooltipState> = (state: TooltipState | undefined, incomingAction: Action): TooltipState => {
    if(state == undefined) {
        return {};
    }
    const action = incomingAction as TooltipAction;
    switch(action.type) {
        case 'TOOLTIP_CLEAR':
            return {};
        case 'TOOLTIP_SET_MOD':
            return { activeMod: action.mod };
        case 'TOOLTIP_SET_ITEM':
            return { activeItem: action.item };
        case 'TOOLTIP_SET_CONTAINER':
            return { activeContainer: action.container };
        case 'TOOLTIP_SET_WEAPON':
            return { activeWeapon: action.weapon };
        default:
            return state;
    }
}