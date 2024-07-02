import * as React from 'react';
import { TheCataclysm } from '../../theming/texts';
import { NavLink } from 'react-router-dom';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const GameInfoRulesLink = new ArticleNavLink({
    path: "#GameInfo",
    name: "Game Info",
    render: () => <GameInfoRules />
})

const GameInfoRules = () => (
    <section id={GameInfoRulesLink.hash} key={GameInfoRulesLink.path}>
        <h2>The Game</h2>
        <p>
            500 A.C. is a Tabletop Role Playing Game (TTRPG) that takes place 500 years after the collapse of civilization, referred to as <TheCataclysm />. Gameplay consists of a Game Master (GM) hosting an adventure for the other players (recommended 3-5 others) to experience. Unlike other TTRPGs, 500 A.C. puts player agency on a pedestal: change your fate by manipulating poker hands of dice!
        </p>
        <p>
            In order to play, you will need at least 5 six-sided dice (also referred to as d6) per player (including the GM), 2 additional d6 to serve as communal dice, and a character sheet in either <NavLink to="/ComingSoon" target="_blank">print</NavLink> or <NavLink to="/Characters" target="_blank">digital</NavLink> form for each player.
        </p>
    </section>
);
