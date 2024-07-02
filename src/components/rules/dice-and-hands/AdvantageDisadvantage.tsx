import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const AdvantageDisadvantageNavLink = new ArticleNavLink({
    name: 'Advantage & Disadvantage',
    path: '#AdvantageDisadvantage',
    render: () => <AdvantageDisadvantageRules />
})

const AdvantageDisadvantageRules = () => (
    <section id={AdvantageDisadvantageNavLink.hash}>
        <h2>{AdvantageDisadvantageNavLink.name}</h2>
        <p>
            Sometimes, you have a bit of help when faced with a challenge. Maybe your friend has your back or you've got cards up your sleeve: something gives you an edge over the opposition. Other times, fortune just isn't favoring you. Maybe you're trying to outrun some wolves and are still recovering from a hangover the night before. To represent these factors, the terms "Advantage" and "Disadvantage" are used.
        </p>

        <h3>Advantage</h3>
        <p>
            When an action roll is said to have advantage, that means you can reroll one additional die. This additional reroll happens alongside any other rerolls you would normally get and after determining which action you'll be taking. If you have multiple sources of advantage when performing an action roll, you still only reroll one additional die.
        </p>
        <p>
            When a reflex roll is performed with advantage, you roll two dice and use the higher value. If you have multiple sources of advantage when performing a reflex roll, you still take the greater value of just two dice.
        </p>

        <h3>Disadvantage</h3>
        <p>
            When an action roll is said to have disadvantage, that means you reroll one less die than you normally would. If you have multiple sources of disadvantage when performing an action roll, you still only reroll one less die than normal. 
        </p>
        <p>
            When a reflex roll is said to have disadvantage, that means you roll two dice and use the lower value. If you have multiple instances of disadvantage, you still take the lower value of just two dice.
        </p>

        <p>
            Advantage and disadvantage cancel each other out and, if you are given advantage and disadvantage multiple times, each instance of advantage or disadvantage cancels out one instance of the other. Thus, if you have more instances of advantage than disadvantage, you perform the roll with advantage. If you have more instances of disadvantage than advantage, you perform the roll with disadvantage. If you have equal instances of advantage and disadvantage on a roll, you treat the roll as normal and don't perform it with either advantage or disadvantage.
        </p>
        <Example>
            You are trying to climb a rope. Your hands are chalked, which the GM rules give you advantage. Your party is also steadying the rope, which the GM rules would also give you advantage. However, the rope is very thin, which the GM rules gives disadvantage. One instance of your advantage will cancel out the disadvantage from the thin rope giving you advantage on this check, letting you reroll up to one of your dice on this Athletics check.
        </Example>

        <p>
            Because NPCs do not roll for their abilities, if an NPC would be given advantage when using an ability against a player, instead players perform their defensive reflex roll with disadvantage. The opposite is also true: if an NPC would be given disadvantage when using an ability against a player, instead that player performs their defensive reflex roll with advantage.
        </p>
    </section>
)