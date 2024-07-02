import React from "react";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { Scenario } from "../../../entities/library/scenarios/Scenario";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { useSelector } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { StringListEditor } from "../StringListEditor";

type Props = {
    scenario: Scenario,
    onUpdate: (scenario: Scenario) => unknown;
}

export const ScenarioBaseEditor = (props: Props) => {
    const { scenario, onUpdate } = props;
    const { enemies, tags } = useSelector((app: AdminState) => app.library);
    const enemyOptions = enemies.map(e => ({ name: e.name, value: e.id }));
    const tagOptions = tags.map(t => ({ name: t, value: t }));
    return (
        <>
            {scenario.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {scenario.id}
                    </CopyableText>
                </div>
            }
            <fieldset>
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={scenario.name}
                        onChange={(e) => onUpdate({ ...scenario, name: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Contents</label>
                    <textarea value={scenario.contents}
                        onChange={(e) => onUpdate({ ...scenario, contents: e.target.value })}></textarea>
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{scenario.contents}</MarkdownContainer>
                    </CollapsibleSection>
                </div>
                <div className="form-field">
                    <label>Enemies</label>
                    <MultiSelect options={enemyOptions} selections={scenario.enemies}
                        onChange={(enemies) => onUpdate({ ...scenario, enemies })}></MultiSelect>
                </div>
                <div className="form-field">
                    <label>Tags</label>
                    <StringListEditor texts={scenario.tags} update={(tags) => onUpdate({ ...scenario, tags })} />
                    <hr />
                    <label>Existing Tags:</label>
                    <MultiSelect options={tagOptions} selections={scenario.tags} onChange={() => {}} />
                </div>
            </fieldset>
        </>
    )
}