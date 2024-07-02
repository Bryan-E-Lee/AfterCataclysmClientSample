import { useSelector } from "react-redux";
import { Hazard } from "../../../entities/library/hazards/Hazard"
import { AdminState } from "../../store/stores/AdminState";
import React from "react";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { MarkdownListEditor } from "../MarkdownListEditor";
import { ThemedCheckbox } from "../../../components/inputs/checkbox/ThemedCheckbox";
import { StringListEditor } from "../StringListEditor";

type Props = {
    hazard: Hazard
    update: (hazard: Hazard) => unknown;
}

export const HazardEditorShared = (props: Props) => {
    const { hazard, update } = props;
    const { tags } = useSelector((app: AdminState) => app.library);
    const tagOptions = tags.map(t => ({ name: t, value: t }));
    return (
        <>
            {hazard.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {hazard.id}
                    </CopyableText>
                </div>
            }
            <div>
                <label>Name</label>
                <input type="text" value={hazard.name}
                    onChange={(e) => update({ ...hazard, name: e.target.value })} />
            </div>

            <div>
                <label>Description</label>
                <textarea value={hazard.description}
                    onChange={(e) => update({ ...hazard, description: e.target.value })}></textarea>
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>{hazard.description}</MarkdownContainer>
                </CollapsibleSection>
            </div>

            <div>
                <label>Rough?</label>
                <ThemedCheckbox checked={hazard.rough} setChecked={(rough) => update({ ...hazard, rough })} />
            </div>

            <div>
                <label>Solutions</label>
                <MarkdownListEditor texts={hazard.solutions} update={solutions => update({ ...hazard, solutions })} />
            </div>

            <div>
                <label>Tags</label>
                <StringListEditor texts={hazard.tags} update={(tags) => update({ ...hazard, tags })} />
            </div>
        </>
    )
}