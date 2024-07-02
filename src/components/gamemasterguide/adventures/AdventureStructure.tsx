import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const AdventureStructureGuideLink = new ArticleNavLink({
    name: "Structuring an Adventure",
    path: "#StructureAdventures",
    render: () => <AdventureStructureGuide />
})

const AdventureStructureGuide = () => (
    <section id={AdventureStructureGuideLink.hash}>
        <h2>{AdventureStructureGuideLink.name}</h2>
        <p>
            When creating your adventure, it helps to break it up. Adventures in <em>500 A.C.</em> are designed to be broken up into <em>Acts</em> which are themselves composed of <em>Scenes</em>:
        </p>
        <dl>
            <dt>Scene</dt>
            <dd>
                Scenes are arbitrary units of time determined by you, the GM. Scenes should generally take place within a consistent location and a mostly consistent group of character (usually at least the party). There are several different types of scenes you can create, each with different emphasis and utility. A scene might consist of the party asking a local the location of a bandit hideout or moving quickly to put out a series of fires.
            </dd>

            <dt>Act</dt>
            <dd>
                An act is a series of scenes which create a miniature narrative within the greater adventure. An act might be the players trying to break into a secret compound for documents they'll need later. It could also be them slaying one of a series of monsters they've been contracted to kill. Characters level up at the end of an act.
            </dd>

            <dt>Adventure</dt>
            <dd>
                An adventure consists of one or more acts to form a greater narrative. An adventure might involve the party attempting to foil the plans of an upstart warlord or questing to retrieve a stolen artifact. Adventures usually have larger themes that will seek to challenge players on a narrative and, potentially, an emotional level.
            </dd>
        </dl>
    </section>
)