import './quick-access.scss';
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Character } from "../../../../../entities/characters/Character"
import { ApplicationState } from "../../../../../store/stores/ApplicationState"
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions"
import { ThemedCheckbox } from "../../../../inputs/checkbox/ThemedCheckbox"
import { RollTool } from "../roll-tool"
import { Loader } from '../../../../theming/loader/Loader';

type Props = { character: Character }

export const SheetQuickAccess: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    const { enforceRules, pendingProperties } = useSelector((app: ApplicationState) => app.sheet);
    const enforceRulesPending = pendingProperties["enforceRules"];
    return (
        <div className="character-quick-access">
            <div className="strict-toggle" title="Indicates if the rules will be strictly enforced, or if you want a freeform character sheet.">
                <ThemedCheckbox checked={enforceRules} disabled={enforceRulesPending} setChecked={(selected) => dispatch(SheetActions.setRuleEnforcement(selected))} />
                <label className="mid-line">Enforce Rules?</label>
                {enforceRulesPending && <Loader textSized />}
            </div>
            <div className="roll-tool">
                <RollTool character={character} />
            </div>
        </div>
    )
}