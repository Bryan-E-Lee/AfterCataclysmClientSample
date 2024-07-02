import React, { useState } from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { IncreasingSkillsRulesLink } from './IncreasingSkillRules';
import { SkillListRulesLink } from './SkillListRules';
import { DiceBoonsPerLevelFigure } from '../figures/DiceBoonFigures';
import { Example } from '../../directives/Directives';
import { Link } from "react-router-dom";
import { ChooseYourSkillsRulesLink } from './ChooseYourSkills';

export const SkillRulesLink = new ArticleNavLink({
    render: (index?: number) => <SkillRules index={index} siblings={RuleLinks} />,
    path: 'Skills',
    name: 'Skills',
    sublinks: [
        SkillListRulesLink,
        ChooseYourSkillsRulesLink,
        IncreasingSkillsRulesLink,
    ]
});

const SkillRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={SkillRulesLink}>
        <p>
            Skills represent a character's physical or mental prowess at performing certain actions. The higher a character's level in their respective skill, the better they are at performing those types of actions. As a character's skill increases, they receive additional Dice Boons (rerolls and extra dice) that they can use to manipulate their roll. Dice Rolls are covered more in the <Link to="/Rules/DiceRolls#Top">dice rolls</Link> section of the rules. The dice boons unlocked as your skills level up can be found below:
        </p>
        <DiceBoonsPerLevelFigure leveledName='Skill' />
        <p>
            If you decide to use your dice boons, you must use all of them simultaneously: you roll any extra dice and reroll dice at the same time. If you have the ability to reroll some number of dice, you may reroll any number up to that many dice.
        </p>
        <Example>
            If you have 2 dice rerolls available to you, you may reroll one, two, or none of your dice if you choose.
        </Example>
        <p>
            Additionally, your skills provide you access to more powerful equipment. In order to use equipment with a skill requirement, your skill must be at least as high as the listed requirement.
        </p>
    </RulesArticle>
);