import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { DiceBoonsPerLevelTable, ExpertiseDiceBoonsTable } from "../figures/DiceBoonFigures";

export const RollingCompetenciesNavLink = new ArticleNavLink({
    name: "Invoking Competencies",
    path: "#Invoke",
    render: () => <RollingCompetenciesRules />
});

const RollingCompetenciesRules = () => (
    <section id={RollingCompetenciesNavLink.hash}>
        <h2>{RollingCompetenciesNavLink.name}</h2>
        <p>
            You will almost never be asked to roll to determine the outcome of a competency: most of the time being competent means you are competent at what you want to do. However, during action scenes and other tense moments, your competency can be put to the test. When performing under such stressful circumstances, you use your roll for the turn just as you would any other ability to invoke your competency.
        </p>
        <p>
            Like your skills, you announce how you intend to invoke your competency after seeing your rolled hand but before using any dice boons. When you invoke your competency, you receive dice boons equal to your character's level. If you have expertise, you receive dice boons as though your character's level were two higher. If you have expertise <em>and</em> your character is level 9 or 10 already, your character has advantage on invoking their competency. As with your skills, you still roleplay out how you use your competency when you invoke it.
        </p>
        <p>
            Below are tables indicating the dice boons you receive for a given competency or expertise level:
        </p>

        <DiceBoonsPerLevelTable leveledName="Character" header="Dice Boons For Competencies" />
        <ExpertiseDiceBoonsTable />
    </section>
)