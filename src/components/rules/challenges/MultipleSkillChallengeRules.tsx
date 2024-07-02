import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Example, GMNote } from '../../directives/Directives';

export const MultipleSkillChallengeRulesLink = new ArticleNavLink({
    name: 'Multi-Skill Challenges',
    path: '#MultiSkillChallenges',
    render: () => <MultipleSkillChallengeRules />
});

const MultipleSkillChallengeRules: React.FC = () => (
    <section id={MultipleSkillChallengeRulesLink.hash} key={MultipleSkillChallengeRulesLink.path}>
        <h2>{MultipleSkillChallengeRulesLink.name}</h2>
        <p>
            Sometimes, a challenge requires a character to use more than one of their skills simultaneously. In these scenarios, the player does the following in order:
        </p>
        <ol>
            <li>They roll their 3 dice as normal.</li>
            <li>
                They choose <em>one</em> of the requisite skills to use dice boons from.
            </li>
            <li>
                Any special abilities that apply to <em>any</em> of the requisite skills apply. For example, if one ability modifies your Explosives skill and another modifies your Athletics skill, then a multi-skill challenge roll for Athletics and Explosives can be modified by both of those abilities.
            </li>
        </ol>
        <Example>
            If you have an ability that gives you advantage on your Athletics skill but your Explosives skill is higher, you can use the dice boons of your explosives skill and still get advantage from the benefit to your Athletics skill.
        </Example>
        <GMNote>
            Take into account the increased strength of using multiple skills together. Typically, a multiple skill challenge score will be about half a difficulty easier for characters. Consider using two separate checks if you think it should be harder, not easier to perform this challenge but don't feel like bumping up the difficulty.
        </GMNote>
    </section>
);
