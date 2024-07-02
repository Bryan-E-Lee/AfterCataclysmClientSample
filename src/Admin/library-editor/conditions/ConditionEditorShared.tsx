import React from "react";
import { Condition } from "../../../entities/characters/Conditions";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { ThemedCheckbox } from "../../../components/inputs/checkbox/ThemedCheckbox";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";

type Props = {
    condition: Condition;
    update: (condition: Condition) => unknown;
}

export const ConditionEditorShared = (props: Props) => {
    const { condition, update } = props;
    return (
        <>
            {condition.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {condition.id}
                    </CopyableText>
                </div>
            }
            <fieldset>
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={condition.name} onChange={(e) => update({ ...condition, name: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={condition.description} onChange={(e) => update({ ...condition, description: e.target.value })} />
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{condition.description}</MarkdownContainer>
                    </CollapsibleSection>
                </div>
                <div className="form-field">
                    <label>Beneficial?</label>
                    <ThemedCheckbox checked={condition.beneficial} setChecked={(beneficial) => update({ ...condition, beneficial })} />
                </div>
            </fieldset>
        </>
    );
}