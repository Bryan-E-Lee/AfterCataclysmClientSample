import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const CommandRulesLink = new ArticleNavLink({
    name: 'Command',
    path: '#Command'
});

export const CommandRules: React.FC = () => (
    <section id={CommandRulesLink.hash}>
        <h3>{CommandRulesLink.name}</h3>
        <p>
            The command action allows you to control vehicles and minions currently under your control. While piloting a vehicle, you can control its movement using the command action. Commanding minions requires 1 hand's worth of actions, and piloting a vehicle requries 2 hand's worth of actions.
        </p>
        <p>
            Sometimes, characters will have control of one or more minions. Characters in control of minions may use the command action to move them as a part of their "minion horde" (described further in a <Link to="/Rules/Minions#Top">later chapter</Link>).
        </p>
    </section>
);