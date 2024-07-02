import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const ReactionRulesLink = new ArticleNavLink({
    name: 'Reactions',
    path: '#Reactions',
    render: () => <ReactionRules />
});

const ReactionRules: React.FC = () => (
    <section id={ReactionRulesLink.hash}>
        <h2>{ReactionRulesLink.name}</h2>
        <p>
            While adventuring, you'll need to act fast to stay alive. That's when your reaction comes in handy: a fast response to something that just happened.
        </p>
        <p>
            Like actions, you can take only one reaction per round, but what makes reactions special is that you can perform them whenever their triggering effect occurs. Every reaction will indicate what lets you use the ability. Most reactions are granted to you by your gear like the ability to trigger a detonator when someone steps on a mine you placed or activate a shield in response to an enemy shooting at you or an ally.
        </p>
    </section>
)