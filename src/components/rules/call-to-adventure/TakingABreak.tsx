import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const VenturingForthRulesLink = new ArticleNavLink({
    path: "#VenturingForth",
    name: "Venturing Forth",
    render: () => <VenturingForthRules />
})

const VenturingForthRules = () => (
    <section id={VenturingForthRulesLink.hash} key={VenturingForthRulesLink.path}>
        <h2>{VenturingForthRulesLink.name}</h2>
        <p>
            As you adventure, you and your equipment will become fatigued. Your will need rest and your gear will need maintenance. After every round of an action scene or whenever someone in your party uses a mod action, your party gets one point of fatigue. At a baseline, parties can sustain 30 points of fatigue before they becoming exhausted.
        </p>
        <p>
            A party is considered exhausted whenever they have more fatigue than their fatigue point maximum. When a party is exhausted, they can't recover health or become juiced by any means, and they have the <Link to="/Library/Conditions/Fatigued">Fatigued</Link> condition.
        </p>
    </section>
)