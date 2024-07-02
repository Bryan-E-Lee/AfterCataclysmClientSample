import React from "react";
import { RhetoricInitializer } from "../../../entities/library/socials/Rhetoric"
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";

type Props = {
    initializer: RhetoricInitializer;
    update: (initializer: RhetoricInitializer) => unknown;
}

export const RhetoricInitizerEditor = (props: Props) => {
    const { initializer, update } = props;
    return (
        <>
            {initializer.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {initializer.id}
                    </CopyableText>
                </div>
            }
            <fieldset>
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={initializer.name} readOnly />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={initializer.description}
                        onChange={(e) => update({ ...initializer, description: e.target.value })}></textarea>
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{initializer.description}</MarkdownContainer>
                    </CollapsibleSection>
                </div>
            </fieldset>
        </>
    )
}