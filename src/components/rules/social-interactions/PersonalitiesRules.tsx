import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { NavLink } from "react-router";

export const PersonalitiesRulesNavLink = new ArticleNavLink({
    name: 'Personalities',
    path: '#Personalities',
    render: () => <PersonalityRules />
});

const PersonalityRules: React.FC = () => (
    <section id={PersonalitiesRulesNavLink.hash} key={PersonalitiesRulesNavLink.path}>
        <h2>{PersonalitiesRulesNavLink.name}</h2>
        <p>
            The wasteland hosts a rich menagerie of people to meet. As you adventure, your character's personality will change with time: impacted by how you interact with others, and impacted in turn by the choices you make.
        </p>
        <p>
            A personality is an attribute of your character that gives you special abilities during conversation and other social activities. When creating a character, you start with two good personalities and one bad. As you interact with other characters in the wasteland, the GM will grant or take away personalities based on how well your character fits that character trait. You can also request to gain or lose certain personalities if you feel that it fits how your character has behaved.
        </p>
        <p>
            There are no special rules as for how personalities are to be distributed or when. If you think a player's character has behaved bravely, they give them the <NavLink to="/Library/Personalities/Brave">Brave</NavLink> personality. Like in real life, conversation in game is dynamic from group to group, so each must determine on their own what constitutes "bravery" or any other personality.
        </p>
    </section>
)