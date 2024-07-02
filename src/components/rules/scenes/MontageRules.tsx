import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";
import { NavLink } from "react-router-dom";

export const MontageRulesLink = new ArticleNavLink({
    name: 'Montages',
    path: '#Montages',
    render: () => <MontageRules />,
})

const MontageRules = () => (
    <section id={MontageRulesLink.hash} key={MontageRulesLink.path}>
        <h2>{MontageRulesLink.name}</h2>
        <p>
            Sometimes, your GM will need a lot of time to pass where specific events have little relevance to the story. Maybe your group is preparing to defend a city or traveling a long distance. Montages take place over a long period of time and are a sort of "fast forward" gameplay where players simply describe the actions they take over the course of the scene. The free time afforded to you during a montage gives you the opportunity to purchase items, craft equipment, and rest among other things. Below is an example of a montage where Chelle and her party take an evening off to rest and prepare before leaving town in the morning:
        </p>
        <Example>
            <h3>Celebrating Victory</h3>
            <strong>GM:</strong> Enjoying the fruits of their labor, the party takes a night off before heading out in the morning.
            <br />
            <strong>You:</strong> I'll have Chelle work on some new electronic devices. She'll craft a <NavLink to="/Library/Items/Sonic+Bowel+Disruptor">Sonic Bowel Disruptor</NavLink> before bed.
        </Example>
    </section>
)