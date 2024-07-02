import { SheetCompetencyAction, SheetCompetencyActions } from "./SheetCompetencyActions";
import { SheetConditionAction, SheetConditionActions } from "./SheetConditionActions";
import { SheetItemAction, SheetItemActions } from "./SheetItemActions";
import { SheetMinionAction, SheetMinionActions } from "./SheetMinionActions";
import { SheetPerkAction, SheetPerkActions } from "./SheetPerkActions";
import { SheetPersonalityAction, SheetPersonalityActions } from "./SheetPersonalityActions";
import { SheetPropertyActions, SheetPropertyAction } from "./SheetPropertyActions";
import { SheetRhetoricAction, SheetRhetoricActions } from "./SheetRhetoricActions";
import { SheetSkillAction, SheetSkillActions } from "./SheetSkillActions";
import { SheetToolAction, SheetToolActions } from "./SheetToolActions";

export type SheetAction = SheetToolAction
    | SheetPropertyAction
    | SheetCompetencyAction
    | SheetConditionAction
    | SheetItemAction
    | SheetMinionAction
    | SheetPerkAction
    | SheetPersonalityAction
    | SheetRhetoricAction
    | SheetSkillAction;

export const SheetActions = {
    ...SheetToolActions,
    ...SheetPropertyActions,
    ...SheetCompetencyActions,
    ...SheetConditionActions,
    ...SheetItemActions,
    ...SheetMinionActions,
    ...SheetPerkActions,
    ...SheetPersonalityActions,
    ...SheetRhetoricActions,
    ...SheetSkillActions,
}