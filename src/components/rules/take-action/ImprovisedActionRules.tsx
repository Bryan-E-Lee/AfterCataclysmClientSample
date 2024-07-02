import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { DiceBoonsPerLevelFigure } from "../figures/DiceBoonFigures";
import { ImprovisedActionDamageTable } from "../figures/ImprovisedActionDamageTables";

export const ImprovisedActionsRulesLink = new ArticleNavLink({
    name: 'Improvised Actions',
    path: '#ImprovisedActions',
    render: () => <ImprovisedActionsRules />,
});

const ImprovisedActionsRules = () => (
    <section id={ImprovisedActionsRulesLink.hash}>
        <h2>{ImprovisedActionsRulesLink.name}</h2>
        <p>
            Oftentimes, the rules will not cover everything you could want to do during an action scene. There aren't rules for shooting exploding barrels, using nearby vines to swing out of danger, or any other number of things you can imagine. To support creativity, all of acts are referred to as "Improvised Actions". Performing an improvised action uses both of your hands, so plan wisely!
        </p>
        <p>
            The outcome of an improvised action should involve a discussion between you and the GM. You should describe the type of action you want to perform and what your intended goal is. The GM will have the final decision as to what the outcome of that action is and roughly how successful it will be if you declare different hands. Once you know the outcome, you choose to perform that Improvised Action and roll your dice as though your character level were a skill you were using (see the table below). Based on the hand you end up declaring, the GM determines the outcome of your action and takes note.
        </p>
        <DiceBoonsPerLevelFigure header="Improvised Action Dice Boons" leveledName="Character" />
        <p>
            Below is a table of how much damage you can expect an improvised action to deal for your character level. The amount of damage you can expect to deal to multiple targets or if it has some other effect is in parentheses. Your GM may determine that more or less damage is appropriate given the circumstances or nature of the improvised action.
        </p>
        <ImprovisedActionDamageTable />
    </section>
)