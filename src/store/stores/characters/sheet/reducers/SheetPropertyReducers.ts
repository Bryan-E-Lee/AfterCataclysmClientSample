import { PatchableProperty } from "../../../../../entities/PatchableProperty";
import { CharacterInitializer } from "../../../../../entities/characters/Character";
import { SheetState } from "../Sheet.State";
import { SheetSetRuleEnforcement } from "../actions/SheetPropertyActions";

const setPropertiesPending = (state: SheetState, propertyNames: PatchableProperty<CharacterInitializer>[]): SheetState => {
    const pendingProperties = { ...state.pendingProperties };
    for (let propertyName of propertyNames) {
        pendingProperties[propertyName as string] = true;
    }
    return { ...state, pendingProperties };
}

const setPropertiesSaved = (state: SheetState, propertyNames: PatchableProperty<CharacterInitializer>[]): SheetState => {
    const pendingProperties = { ...state.pendingProperties };
    for (let propertyName of propertyNames) {
        delete pendingProperties[propertyName as string];
    }
    return { ...state, pendingProperties };
}

const setRuleEnforcement = (state: SheetState, action: SheetSetRuleEnforcement): SheetState => ({
    ...state,
    enforceRules: action.enforceRules
})

export const SheetPropertyReducers = {
    setPropertiesPending,
    setPropertiesSaved,
    setRuleEnforcement,
}