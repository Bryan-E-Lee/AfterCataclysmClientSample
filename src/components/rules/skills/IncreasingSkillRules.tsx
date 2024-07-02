import React from "react";
import { Skill } from "../../../entities/library/skills/Skill";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const IncreasingSkillsRulesLink = new ArticleNavLink({
    name: 'Increasing Your Skills',
    path: '#IncreasingSkills',
    render: () => <IncreasingSkills />
});

const IncreasingSkills: React.FC = () => (
    <section id={IncreasingSkillsRulesLink.hash} key={IncreasingSkillsRulesLink.path}>
        <h2>{IncreasingSkillsRulesLink.name}</h2>
        <p>
            As you level up, your skills will increase. Whenever you gain a level, you receive {Skill.PointsPerLevel} skill points which you can use to increase your skills by 1 per point spent. A skill cannot be advanced more than {Skill.MaxSkillDifference} levels above your current level and never above level 10.
        </p>
        <Example>
            A character is not allowed to have a Subterfuge skill of 8 when they are only level 5.
        </Example>
    </section>
)