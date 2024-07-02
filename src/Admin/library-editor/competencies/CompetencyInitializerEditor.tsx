import React from "react";
import { CompetencyCategory, CompetencyCategoryOptions, CompetencyInitializer } from "../../../entities/characters/Competencies";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";

type Props = {
    competency: CompetencyInitializer;
    update: (competency: CompetencyInitializer) => unknown;
}

export const CompetencyEditorShared = (props: Props) => {
    const {competency, update} = props;
    return (
        <>
            {competency.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {competency.id}
                    </CopyableText>
                </div>
            }
            <fieldset>
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={competency.name}
                        onChange={(e) => update({ ...competency, name: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={competency.description}
                        onChange={(e) => update({ ...competency, description: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Category</label>
                    <SingleSelect options={CompetencyCategoryOptions} selection={competency.category}
                        onChange={(category: CompetencyCategory) => update({ ...competency, category })} />
                </div>
            </fieldset>
        </>
    )
}