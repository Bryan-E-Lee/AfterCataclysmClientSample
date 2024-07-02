import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const CreatingActionScenesGuideLink = new ArticleNavLink({
    name: "Creating Action Scenes",
    path: "#CreatingActionScenes",
    render: () => <CreatingActionScenesGuide />
})

const CreatingActionScenesGuide = () => (
    <section id={CreatingActionScenesGuideLink.hash}>
        <h2>{CreatingActionScenesGuideLink.name}</h2>
        <p>
            This chapter will cover two main types of action scenes: combat based and environmental based action. Combat based action is resolved by the party overcoming one or more enemies by force or submission. Environmental based action is resolved by nullifying some sort of threat posed by the area the party finds themselves.
        </p>

        <h3>Creating Combat Action Scenes</h3>
        <p>
            To create a combat scene, you should select enemies that might be found in the party's location. If they are in a criminal compound, it is likely they will be facing off against gang members or bandits. If the party is in an ogre lair, they will likely be facing off against ogres and other aberrations. The game is designed so that a party should be capable of partaking in 3 fights before resting, with each fight containing enemies whose total level is equal to the total of each player's level in the party.
        </p>
        <Example>
            Consider your party has three level 3 characters. The party's total level is <strong>9</strong> (3 + 3 + 3). A fair fight might include three Cyberwolves (level 2) and a Cyberwolf Alpha (level 3) who also have a total level of <strong>9</strong> (2 + 2 + 2 + 3).
        </Example>

        <h3>Creating Environmental Action Scenes</h3>
        <p>
            Environmental action scenes have a bit more leeway in their setup. Whether browsing through the pregenerated environmental hazards or creating your own, the only requirement for environmental action scenes is that they be solveable for your players. There are a few guidelines though for keeping environmental action scenes exciting:
        </p>
        <ul>
            <li>
                Reward players for using abilities and skill checks that require a roll. If players can solve a problem by expending resources or by taking risks, consider shortcutting some of the other parts of the challenge or rewarding the players with treasure.
            </li>
            <li>
                Be flexible when accepting solutions. Environmental checks are definitely more about going with what feels like it works rather than attempting to strictly follow the rules.
            </li>
            <li>
                Don't be afraid to alter existing hazards to match the theme of the party's environment.
            </li>
        </ul>
        
        <h3>Combining Combat & Hazards</h3>
        <p>
            You can use hazards and enemies together to make exciting and engaging encounters! Consider how hazards might enhance the abilities of enemies to really get your players thinking. Forcing players to make tough decisions between using their resources to pacify enemies or neutralize hazards can make your play sessions more interesting: a flooding room is one thing, but a flooding room with enemies shooting at you from the grating above will feel even more dangerous!
        </p>
    </section>
)