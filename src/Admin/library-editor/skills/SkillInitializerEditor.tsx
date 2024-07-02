import React from "react";
import { SkillInitializer } from "../../../entities/library/skills/Skill"
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { SkillName } from "../../../entities/library/skills/SkillMap";
import { AbilitiesByLevelCollectionEditor } from "../AbilitiesByLevelCollectionEditor";

type Props = {
    initializer: SkillInitializer;
    update: (initializer: SkillInitializer) => unknown;
}

export const SkillInitializerEditor = (props: Props) => {
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
                    <label>Name (requires code change)</label>
                    <input type='text' value={initializer.name}
                        onChange={(e) => update({ ...initializer, name: e.target.value as SkillName })} />
                    {/* Force the name to be accepted for now */}
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={initializer.description}
                        onChange={(e) => update({ ...initializer, description: e.target.value })}></textarea>
                </div>
            </fieldset>
            <fieldset>
                <legend>Skill Features</legend>
                <AbilitiesByLevelCollectionEditor collections={initializer.featuresByLevel}
                    update={(skillFeatures) => update({ ...initializer, featuresByLevel: skillFeatures})} />
            </fieldset>
        </>
    )
}