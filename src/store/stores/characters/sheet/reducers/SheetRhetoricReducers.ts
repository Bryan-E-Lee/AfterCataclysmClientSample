import { OwnedRhetoricInitializer, Rhetoric } from "../../../../../entities/library/socials/Rhetoric";
import { SheetSaveRhetoric, SheetUpdateRhetoric, SheetAdjustRhetoric, SheetOverrideRhetoric } from "../actions/SheetRhetoricActions";
import { SheetState } from "../Sheet.State";

const updateSheetRhetorics = (state: SheetState, ...rhetorics: OwnedRhetoricInitializer[]) => ({...state, rhetorics})

const saveRhetoric = (state: SheetState, action: SheetSaveRhetoric): SheetState => {
    const { character, rhetoricId } = action;
    const rhetoric = character.rhetorics.get(rhetoricId);
    if (rhetoric == null) {
        console.error('Attempt to save nonexistent rhetoric.');
        return state;
    }
    rhetoric.saved = true;
    return updateSheetRhetorics(state, ...character.rhetorics);
}

const updateRhetoric = (state: SheetState, action: SheetUpdateRhetoric): SheetState => {
    const { character, rhetoricId, priority } = action;
    const rhetoric = character.rhetorics.get(rhetoricId);
    if (rhetoric == null) {
        console.error('Attempt update nonexistent rhetoric.');
        return state;
    }
    rhetoric.priority = priority;
    rhetoric.saved = !rhetoric.saved;
    return updateSheetRhetorics(state, ...character.rhetorics);
}

const adjustRhetoric = (state: SheetState, action: SheetAdjustRhetoric): SheetState => {
    const { character, rhetoricId, adjustment } = action;
    const rhetoric = character.rhetorics.get(rhetoricId);
    if (rhetoric == null) {
        console.error('Attempt adjust nonexistent rhetoric.');
        return state;
    }
    rhetoric.adjustment = adjustment;
    rhetoric.saved = !rhetoric.saved;
    return updateSheetRhetorics(state, ...character.rhetorics);
}

const overrideRhetoric = (state: SheetState, action: SheetOverrideRhetoric): SheetState => {
    const { character, rhetoricId, override } = action;
    const rhetoric = character.rhetorics.get(rhetoricId);
    if (rhetoric == null) {
        console.error('Attempt override nonexistent rhetoric.');
        return state;
    }
    rhetoric.override = override;
    rhetoric.saved = !rhetoric.saved;
    return updateSheetRhetorics(state, ...character.rhetorics);
}

export const RhetoricActionReducers = {
    saveRhetoric,
    updateRhetoric,
    adjustRhetoric,
    overrideRhetoric,
}