import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const StartingTheAdventureGuideLink = new ArticleNavLink({
    name: "Starting the Adventure",
    path: "#StartingTheAdventure",
    render: () => <StartingTheAdventureGuide />
})

const StartingTheAdventureGuide = () => (
    <section id={StartingTheAdventureGuideLink.hash}>
        <h2>{StartingTheAdventureGuideLink.name}</h2>
        <p>
            Starting a new adventure is challenging; this chapter will assist you in getting the ball rolling. This advice is especially useful if you have never played an RPG before <em>or</em> if you have never been a GM before!
        </p>

        <h3>Session Zero</h3>
        <p>
            In some other RPGs, they'll refer to many of the following sections as part of a <em>Session Zero</em> or <em>Session 0</em>. A <em>Session Zero</em> is an initial play session before the adventure begins where the GM and the players will work together to generate characters and discuss the nature of the advneture. Feel free to use that terminology here too, but each section will stand alone to let you decide how you want to get started. You also don't need to have an actual separate session just to create characters and review the adventure: sometimes it's okay to let players build their characters in advance.
        </p>

        <h3>Who's Playing Who?</h3>
        <p>
            Before beginning any adventure, you'll need to know who is playing and what characters those players are playing as. This means you should be informed of what characters will be in the adventure, what those characters are capable of doing, and who they are: you want to know their backgrounds, motivations, and existing relationships.
        </p>

        <h3>Getting the Party Together</h3>
        <p>
            It won't always make sense for player characters to know each other: in fact it's quite unlikely! There are several common tropes you can use to introduce the party to one another, some ideas are listed below:
        </p>
        <ul>
            <li>
                Each of the player characters has received a letter from a someone (perhaps a mysterious someone) requesting their presence at a known location.
            </li>
            <li>
                The player characters are all captive together at the start of the adventure.
            </li>
            <li>
                The player characters all happen to be in a common area when a noteworthy event occurs.
            </li>
        </ul>
    </section>
)