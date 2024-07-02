import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const CreatingAdventuresGuideLink = new ArticleNavLink({
    name: "Creating Adventures",
    path: "#CreatingAdventures",
    render: () => <CreatingAdventuresGuide />
});

const CreatingAdventuresGuide = () => (
    <section id={CreatingAdventuresGuideLink.hash}>
        <h2>{CreatingAdventuresGuideLink.name}</h2>
        <p>
            The first step to creating an adventure is to think about a big narrative goal that gives your players' characters motivation to go forth and accomplish the task at hand. You can choose one of the official published adventures or craft your own.
        </p>

        <h3>Choosing a Published Adventure</h3>
        <p>
            Published adventures are official adventures that have been designed and playtested for use with the <em>500 A.C.</em> system. Published adventures are great for getting play started quickly or when you're just starting out and aren't sure how to create your own adventures just yet.
        </p>
        <p>
            Published adventures will provide you with key locations, NPCs, and objects that your players will interact with, along with major plot points and contingencies for what happens when players make certain decisions. You'll still need to improvise a bit and accommodate for your players' decisions: no adventure can account for every possible action someone could take.
        </p>

        <h3>An Adventure of Your Own</h3>
        <p>
            Creating your own adventure can be a fun endeavor all its own! Maybe you feel like telling your own tale, or you know your players are looking for something original, this section will give you tools and ideas for creating your own adventure.
        </p>

        <h4>Creating Conflict</h4>
        <p>
            A good adventure has some sort of conflict that motivates the characters within to act. A conflict could be very clear and obvious like there is an upstart warlord who has been expanding his territory violently, or it could be revealed to the characters only after solving a mystery to unravel the greater conspiracy. Every adventure has this conflict to drive the plot and actions of the characters within.
        </p>

        <h4>Creating Nodes (Places of Interest)</h4>
        <p>
            You will never be able to build every place your players will venture beforehand, but it is important to establish a few key places of interest, known as <em>Nodes</em>, which serve as focal points for the adventure's plot to advance. Keep in mind that not every node has to be accessible to players right away: maybe they won't be able to venture to an island settlement until they get a boat or the local ferry is fixed.
        </p>
        <p>
            Nodes are important for giving players free access to different locations which provide them with different access to resources to advance the plot. A rebel base in the hills may serve as a safe haven and source of information early in the adventure, but become a series of combat encounters when the antagonist learns of its location after confronting the party earlier.
        </p>
        <p>
            Nodes also give players the chance to approach problems in ways you hadn't intended. If the players are investigating a mystery and there are important clues at two different nodes, the information at one node might lead the players to investigate the second node. Or, approaching the problem in the opposite direction, the players might go to the second node, use that information to get to their target, but realize they need the context of the first node, requiring them to backtrack there.
        </p>
        <Example>
            Your party is searching for a thief. They know that he has stolen from the local village and the nearby dam. At the village, the party will find evidence implicating Jayce. At the dam, they will find evidence that the thief had accomplices they disagreed with. Putting the two together gives the party information that Jayce might be coerced or working with others purely out of necessity. That will give them more leads on who else he is working with, such as the local gang. 
        </Example>

        <h4>Creating Key NPCs</h4>
        <p>
            Having important people for your players to meet is just as important as giving them interesting places to go. Creating interseting characters involves giving them motivations and roles within the narrative. Below are some ideas for NPC roles:
        </p>
        <ul>
            <li>
                Helper. This NPC will provide consistent help to the players in achieving their goals.
            </li>
            <li>
                Obstructor. This NPC exists primarily to oppose or limit the NPCs when attempting to accomplish their goals.
            </li>
            <li>
                Antagonist. This NPC violently opposes the party.
            </li>
            <li>
                Revealer. This NPC exists primarily to give the NPCs information important to some plot point in the adventure.
            </li>
            <li>
                Red Herring. This NPC serves to lead the NPCs into believing something false. They may be a fake villain or they could push a false narrative on the NPCs for some personal reason.
            </li>
            <li>
                Indirect. This NPC is never interacted with directly, but their actions have impacted the adventure or other characters within the adventure. They could be an important political figure whose decisions affect the party or they could be a historical figure about whom legends were told.
            </li>
        </ul>
        <p>
            When creating characters, it's important to make them feel like a real person. Think about this character and give them motivations, consider their relationships with other characters, and how their skillsets have impacted their life.
        </p>
    </section>
)