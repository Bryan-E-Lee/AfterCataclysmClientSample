import React from "react"
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink"
import { Link } from "react-router-dom";

export const FriendRulesLink = new ArticleNavLink({
    name: 'Friends',
    path: '#Friends',
    render: () => <FriendRules />,
})

const FriendRules = () => (
    <section id={FriendRulesLink.hash}>
        <h2>{FriendRulesLink.name}</h2>
        <p>
            On your journey, you'll come across characters established and controlled by the GM. Referred to as an NPC (Non-Player Character), you can find they can help or hinder your quest. When coming across one or more NPCs, you should react with them as though you were your character. If they are traveling merchants, maybe you are interested in hearing about the latest news from nearby towns. If they are locals, you might be interested in finding some work or the best bars in town.
        </p>
        <p>
            There are some special social interactions that you can have with NPCs covered in more detail in the chapter on <Link to="/Rules/SocialInteractions#Top">Social Interactions</Link>.
        </p>
    </section>
)