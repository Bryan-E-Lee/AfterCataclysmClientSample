import React, { useState } from "react";
import { SelectableOption } from "../../components/inputs/selects/SelectableOption";
import { SingleSelect } from "../../components/inputs/selects/singleselect/SingleSelect";
import { ThemedButton } from "../../components/inputs/buttons/ThemedButton";
import { SkillName, SkillNames } from "../../entities/library/skills/SkillMap";
import { SkillRequirement } from "../../entities/library/skills/SkillRequirement";

interface SelectableSkill extends SelectableOption<string> {
    name: SkillName;
    value: SkillName;
}

const SelectableSkillNameOptions = SkillNames.map<SelectableSkill>(sn => ({
    name: sn,
    value: sn
} as SelectableSkill));

type SkillRequirementProps = {
    requirements: SkillRequirement[];
    update: (skillRequirements: SkillRequirement[]) => void;
}

const GenerateNewDefaultRestriction = (): SkillRequirement => ({
    name: 'Athletics',
    level: 1
});

export const SkillRequirementsEditor: React.FC<SkillRequirementProps> = (props) => {
    const { requirements, update } = props;
    return (
        <div>
            {requirements.map((r, i) => <SkillRequirementEditor requirements={requirements} requirement={r} index={i} key={r.name}
                update={(skillRestriction, index) => {
                    requirements.splice(index, 1, skillRestriction);
                    update(requirements);
                }}
                delete={(index) => {
                    requirements.splice(index, 1);
                    update(requirements);
                }} />)}
            <ThemedButton onClick={() => update([...requirements, GenerateNewDefaultRestriction()])}>
                + Add
            </ThemedButton>
        </div>
    );
}

type EditorProps = {
    requirements: SkillRequirement[];
    requirement: SkillRequirement;
    index: number;
    update: (skillRequirement: SkillRequirement, index: number) => void;
    delete: (index: number) => void;
}

const SkillRequirementEditor: React.FC<EditorProps> = (props: EditorProps) => {
    const [skillRequirement, updateSkillRequirement] = useState<SkillRequirement>(props.requirement);
    const options = SelectableSkillNameOptions.map(sno => ({ ...sno, disabled: props.requirements.any(r => r.name == sno.name) }));
    return (
        <div>
            <label>Level Requirement</label>
            <ThemedButton onClick={() => props.delete(props.index)}>
                Delete
            </ThemedButton>
            <div>
                <label>Skill</label>
                <SingleSelect filterable options={options} selection={props.requirement.name}
                    onChange={(selection: SkillName) => {
                        const newState = { ...skillRequirement, name: selection };
                        updateSkillRequirement(newState);
                        props.update(newState, props.index);
                    }}
                />
            </div>
            <div>
                <label>Level</label>
                <input type='number' value={skillRequirement.level} step='1'
                    onChange={(e) => {
                        const newState = {
                            ...skillRequirement,
                            level: parseInt(e.target.value)
                        };
                        updateSkillRequirement(newState);
                        props.update(newState, props.index);
                    }}
                />
            </div>
        </div>
    );
}