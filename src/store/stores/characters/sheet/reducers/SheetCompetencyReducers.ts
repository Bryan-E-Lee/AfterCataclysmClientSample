import { Competency } from "../../../../../entities/characters/Competencies";
import { OwnedCompetencyReference } from "../../../../../entities/Ownership";
import { SheetState } from "../Sheet.State"
import { SheetRemoveCompetency, SheetSaveCompetency, SheetSaveCustomCompetency, SheetSetCompetencyLevel } from "../actions/SheetCompetencyActions";

const updateSheetCompetencies = (state: SheetState, competencies: OwnedCompetencyReference[], customCompetencies: Competency[]) =>
    ({ ...state, competencies: [...competencies], customCompetencies: [...customCompetencies] });

const removeCompetency = (state: SheetState, action: SheetRemoveCompetency): SheetState => {
    const { id } = action;
    const competencies = state.competencies.filter(c => c.id != id);
    const customCompetencies = state.customCompetencies.filter(c => c.id != id);
    return updateSheetCompetencies(state, competencies, customCompetencies);
}

const setCompetencyLevel = (state: SheetState, action: SheetSetCompetencyLevel): SheetState => {
    const { id, isExpert } = action;
    const competency = state.competencies.find(c => c.id == id)
        ?? state.customCompetencies.find(c => c.id  == id);
    if (competency == null) {
        return state;
    }
    competency.isExpert = isExpert;
    competency.saved = false;
    return updateSheetCompetencies(state, state.competencies, state.customCompetencies);
}

const saveCompetency = (state: SheetState, action: SheetSaveCompetency): SheetState => {
    const { competencyId } = action;
    const competency = state.competencies.find(c => c.id == competencyId);
    if (competency == null) {
        return state;
    }
    competency.saved = true;
    return updateSheetCompetencies(state, state.competencies, state.customCompetencies);
}

const saveCustomCompetency = (state: SheetState, action: SheetSaveCustomCompetency): SheetState => {
    const { oldCompetencyId, newCompetencyId } = action;
    const competency = state.customCompetencies.find(c => c.id == oldCompetencyId);
    if (competency == null) {
        return state;
    }
    competency.id = newCompetencyId;
    competency.saved = true;
    return updateSheetCompetencies(state, state.competencies, state.customCompetencies);
}

export const SheetCompetencyReducers = {
    removeCompetency,
    setCompetencyLevel,
    saveCompetency,
    saveCustomCompetency
}