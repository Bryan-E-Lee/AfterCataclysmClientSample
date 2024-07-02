import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";

const RollTriggersLink = new ArticleNavLink({
    path: "#RollTriggers",
    name: "Roll Triggers"
})

export const ActionRulesLink = new ArticleNavLink({
    name: 'Performing Actions',
    path: '#PerformingActions',
    render: () => <ActionRules />,
});

const ActionRules = () => (
    <section id={ActionRulesLink.hash}>
        <h2>{ActionRulesLink.name}</h2>
        <p>
            Actions are proactive abilities you can perform to <em>make something happen</em>. If timing is important, actions take place within about a 6 second window. You can do <em>any</em> of the following once when it's time for the players to act during an action scene or do any of these outside of an action scene so long as it's reasonable you could. So long as the players have the initiative, their actions take place in any order they choose. Work together with your teammates to maximize the effect of your actions!
        </p>
        <p>
            When declaring your actions, you choose from one of your available abilities from your weapons and equipped items after having seen your initial roll. Once you have selected an action, you may use dice boons based on how your level with that skill. You then declare a roll to use for the action using a total of 5 dice in any combination from the communal dice and your own dice.
        </p>
        <section id={RollTriggersLink.hash}>
            <h3>{RollTriggersLink.name}</h3>
            <p>
                Some actions will refer to <em>Roll Triggers</em>. A roll trigger occurs when you have a certain roll: all of the effects listed for that roll occur. Remember, you can only declare one roll with your dice, so you can only have the benefits of one Roll Trigger at a time.
            </p>
        </section>
    </section>
);