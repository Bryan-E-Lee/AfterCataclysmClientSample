import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { ActionRulesLink } from "./actions/ActionRules";
import { PassiveRulesLink } from "./Passives";
import { ReactionRulesLink } from "./ReactionRules";
import { Link } from "react-router-dom";

export const AbilityRulesLink = new ArticleNavLink({
    name: 'Abilities',
    path: '#Abilities',
    render: () => <AbilityRules />
});

const AbilityRules: React.FC = () => (
    <section id={AbilityRulesLink.hash}>
        <h2>{AbilityRulesLink.name}</h2>
        <p>
            Your abilities define what your character can do to influence people and objects you find in the wasteland. There are three types of abilities:
        </p>
        <ul>
            <li>
                <Link to={`#${ActionRulesLink.hash}`}>Actions (Active Abilities)</Link>
            </li>
            <li>
                <Link to={`#${ReactionRulesLink.hash}`}>Reactions (Reactive Abilities)</Link>
            </li>
            <li>
                <Link to={`#${PassiveRulesLink.hash}`}>Passives (Passive Abilities)</Link>
            </li>
        </ul>
    </section>
)