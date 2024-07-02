import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";

export const CommunicateRulesLink = new ArticleNavLink({
    name: 'Communicate',
    path: '#Communicate'
});

export const CommunicateRules: React.FC = () => (
    <section id={CommunicateRulesLink.hash} key={CommunicateRulesLink.path}>
        <h3>{CommunicateRulesLink.name}</h3>
        <p>
            Communication is key! This includes speaking or signaling
            something, anthing, to another character. Perhaps you are
            requesting help on the radio, or using a hand gesture to
            warn your companions to be careful of a trip wire on the
            ground, whatever it is, if it communicates a message to
            someone, it's part of the communication action.
        </p>
        <p>
            Unlike other actions, communication is free. You read that
            right, communication is 100% free! That means you can do it
            any time, any place, so long as you have the means to 
            communicate in the manner indicated (you can't speak through
            a radio you don't have). That being said, GMs should keep
            speech and other communications within reasonable limits. A
            round lasts 6 seconds, so characters should not be writing
            essays or performing their new interpretive dance routine
            in the duration of a communication action.
        </p>
    </section>
)