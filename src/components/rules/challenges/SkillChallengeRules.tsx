import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";
import { Example, GMNote } from "../../directives/Directives";
import { ChallengeDifficultyTable } from "../figures/ChallengeFigures";

export const SkillChallengeRulesLink = new ArticleNavLink({
    path: "#SkillChallenges",
    name: "Skill Challenges",
    render: () => <SkillChallengeRules />
})

const SkillChallengeRules = () => (
    <section id={SkillChallengeRulesLink.hash}>
        <h2>{SkillChallengeRulesLink.name}</h2>
        <p>
            Skill challenges occur when one of your <Link to="/Library/Skills">skills</Link> is being challenged by the GM.
        </p>
        <h3>Performing A Skill Challenge</h3>
        <p>
            To perform a skill challenge, the GM decides which of your skills is most relevant for the challenge. If you try to pry open a stuck door, expect your athletics skill to be relevant. If you try to set a broken leg, your medicine skill will probably be used.
        </p>
        <Example>
            You try to defuse a bomb, and your GM issues a moderate Explosives challenge against your explosives skill of 5. First, the GM rolls the two communal dice, then you and the GM roll your 3 initial dice. Because you have an explosive skill of 5, you can reroll up to 1 die and roll 1 extra die. Because the GM issued a moderate challenge, they can reroll up to 1 die. After you've both used your dice boons, you declare rolls and determine which roll wins according to the table listed in the chapter on <Link to="/Rules/Dice#RollValues">roll values</Link>.
        </Example>
    </section>
)