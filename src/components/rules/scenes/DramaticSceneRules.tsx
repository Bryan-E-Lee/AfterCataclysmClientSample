import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const DramaticScenesRulesLink = new ArticleNavLink({
    name: 'Dramatic Scenes',
    path: '#DramaticScenes',
    render: () => <DramaticScenesRules />
})

const DramaticScenesRules = () => (
    <section id={DramaticScenesRulesLink.hash} key={DramaticScenesRulesLink.path}>
        <h2>{DramaticScenesRulesLink.name}</h2>
        <p>
            Most scenes you find yourself in will be dramatic scenes. A dramatic scene is used to progress the characters and story forward through conversation and other interactions. Below is a small excerpt from a dramatic scene:
        </p>
        <Example>
            <h3>Getting Paid</h3>
            <strong>Mayor Lenna (NPC):</strong> Well, let's see what you've got.
            <br />
            <strong>Chelle Zappah (PC):</strong> The Bleeding Wolves will trouble you and your people no more. You'll find Brok's corpse and your stolen artifacts are a kilometer straight past the front gate.
            <br />
            <strong>Mayor Lenna (NPC):</strong> Incredible! I never doubted you all of course, having put down The Glowing Hydra was proof enough for me. *Lenna beckons her secretary* James here will get you the agreed upon payment with a quick trip to the treasury.
        </Example>
        <p>
            Dramatic scenes are usually highly interactive, asking players to roleplay both dialogue and actions to gain knowledge or move the plot forward. Creative roleplay during dramatic scenes 
        </p>
    </section>
)