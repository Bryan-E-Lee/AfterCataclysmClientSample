import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const DesigningForYourPlayersGuideLink = new ArticleNavLink({
    name: "Designing For Your Players",
    path: "#DesigningForPlayers",
    render: () => <DesigningForYourPlayersGuide />
})

const DesigningForYourPlayersGuide = () => (
    <section id={DesigningForYourPlayersGuideLink.hash}>
        <h2>{DesigningForYourPlayersGuideLink.name}</h2>
        <p>
            Every party is different, this guide will help you tweak adventures and adapt them to your players.
        </p>

        <h3>Consider Content</h3>
        <p>
            Not all players will feel comfortable with every topic or setting. For example, some players may not feel comfortable with graphic descriptions of gore and violence. Others may not feel comfortable with content that is too similar to something that has happened in their past. It's a good idea to inform your players about the type of content you intend to expose them to in the adventure and to ask them to let you know in private if there's anything they'd prefer to not to experience.
        </p>

        <h3>Account for Choices</h3>
        <p>
            While the game's content is designed for all types of parties and character builds, it's not possible to ensure that the content is equally engaging for each of these possibilities. Consider keeping track of the following to get a better idea of how to keep the adventure fun for everyone involved:
        </p>
        <ul>
            <li>
                Ask your players before the adventure begins what they want to do. Knowing in advance what your players are looking might inspire you to write an entire act that explores that topic! 
            </li>
            <li>
                Try to get a gauge of which players are participating who want to, and how much time each is getting to roleplay. If one player is taking up a lot of the spotlight, it could be that you're designing challenges that cater to their character. It could also mean that they are hogging roleplay time, in which case you may want to talk with them in private if it's preventing everyone from getting a chance to participate who wants to.
            </li>
            <li>
                Keep track of which characters are falling behind in combat and challenge utility. Try giving players who are underperforming more challenges and enemies that cater to them. For example, if a character who does a lot of fire damage is underperforming, consider introducing more enemies which have low resilience.
            </li>
            <li>
                Note how your players react to things. If players are excited about something, think about ways you might be able to reintroduce that event or character later! If they are unenthused or groaning, try to avoid those types of challenges in the future.
            </li>
        </ul>

        <h3>React To Backgrounds</h3>
        <p>
            You should always consider your player character's backgrounds and try to make them a part of the story. Your players will be more engaged with your adventure if their backgrounds are woven into the plot.
        </p>
        <Example>
            If one of your player characters is searching for their sibling's murderer, then you should try to incorporate that into the adventure. Think about important characters already present who could be the murderer, or creating and introducing the murderer as part of an act.
        </Example>
    </section>
)