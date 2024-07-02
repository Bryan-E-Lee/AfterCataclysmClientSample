import React from "react";
import { SkillInitializer } from "../../../entities/library/skills/Skill"
import { NoFilterResults } from "../../filtering/NoFilterResults";
import { SkillBlock } from "./SkillBlock";

type Props = {
    skills: SkillInitializer[];
}

export const SkillResults = (props: Props) => {
    const { skills } = props;

    if (skills.length == 0) {
        return <NoFilterResults />;
    }

    return (
        <section className="search-results">
            <div>
                {skills.map(skill => <SkillBlock key={skill.id} skill={skill} />)}
            </div>
        </section>
    )
}