import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";
import { Link } from "react-router-dom";

export const CreatingActsGuideLink = new ArticleNavLink({
    name: "Creating Acts",
    path: "#CreatingActs",
    render: () => <CreatingActsGuide />
});

const CreatingActsGuide = () => (
    <section id={CreatingActsGuideLink.hash}>
        <h2>{CreatingActsGuideLink.name}</h2>
        <p>
            Once you've figured out the overarching narrative for your adventure, it's time to break it up into acts. Some adventures can consist of only a single act (so your job is already done!) but many consist of two or more. Acts serve as narrative breaks within the adventure and represent your players' characters becoming stronger by leveling up.
        </p>
        <p>
            Each act consists of a collection of scenes. You don't need to figure out all the scenes in advance - and it's almost always a bad idea - because you can create scenes on the fly to address what your party wants to do. If you haven't already, check out the rules chapter on <Link to="/Rules/Scenes">scenes</Link>. There are several types of scenes you have to work with; each with an example of how you as the GM might introduce these scenes:
        </p>
        <dl>
            <dt>Establishing Scene</dt>
            <dd>
                An establishing scene sets the mood and provides a description to the players of where they are and what lies ahead. Establishing scenes should be very brief: they exist solely to communicate an idea to the party without any interaction.
            </dd>
            <Example>
                GM (You): "You find yourselves dizzy and dehydrated on the sandy shoreline. The sun pours over you like the hot wax of a wilting candle. Apart from the dense forest and cliffs, only a lone shipwreck is visible near the edge of the horizon.""
            </Example>

            <dt>Dramatic Scenes</dt>
            <dd>
                Dramatic Scenes are the most common type of scene. Dramatic Scenes involve conversations between characters, both players and you as the NPCs. They can involve skill checks, actions, or anything else that the players or NPCs could plausibly do. Dramatic scenes are a free flow back and forth between you representing NPCs and the world and your players roleplaying.
            </dd>
            <Example>
                GM (You): As you approach, a guard shouts down from the gate laser at the ready.
                <br />
                Guard #1 (You): Halt strangers; announce your business in Hargrove and we'll have no quarrel.
            </Example>

            <dt>Action Scenes</dt>
            <dd>
                Action Scenes are highly regimented to keep a consistent time. Whenever more exact timing is needed to establish what happens, you should enter an action scene. Action Scenes include combat and environmental hazards: events which require the players to react in a more regulated way.
            </dd>
            <Example>
                GM (You): The raiders don't seem swayed by your words. Action!
                <br />
                (Follow the rules in the chapter on <Link to="/Rules/Action">action</Link> to see how the battle plays out!)
            </Example>

            <dt>Montages</dt>
            <dd>
                Montages are similar to Dramatic Scenes in that they are free-flowing. Unlike Dramatic Scenes though, Montages don't contain any dialogue and are a way to "fast forward" through time by having players describe what they do over the course of the montage and you briefly describe what happens over the same time frame. Just like how Action Scenes are useful for more precise timing, Montages are useful for imprecise timing.
            </dd>
            <Example>
                GM (You): The train is about a day's ride. So you have you've got time to do whatever you want that's possible on this train.
            </Example>
        </dl>

        <p>
            Feel free to break up or introduce scenes as you see fit to keep the narrative flowing. Scenes are, first and foremost, a tool to use to facilitate roleplaying. Don't let scenes get in the way of good gameplay! Be dynamic with your scenes when needed.
        </p>
    </section>
)