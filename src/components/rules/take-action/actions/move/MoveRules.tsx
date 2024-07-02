import React from "react";
import { ArticleNavLink } from "../../../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const MovementRulesLink = new ArticleNavLink({
    name: 'Movement',
    path: '#Movement'
});

export const MovementRules: React.FC = () => (
    <section id={MovementRulesLink.hash} key={MovementRulesLink.path}>
        <h3>{MovementRulesLink.name}</h3>
        <p>
            During their turn, players can move a total number of hexes equal to their speed. Once a player has exhausted all of their movement, their turn ends. A player may continue moving throughout their turn so long as they have movement, even if they have taken other actions. When in the prone  position, every hex traversed costs 3 hexes of movement. After moving into a hex, a character can choose to face any of the six directions of their current hex's faces.
        </p>
        <p>
            You can use movement to get into a standing position or the prone position. It costs 1 hexes of movement to move into the prone position from standing, and 3 hexes of movement to move into the standing position from the prone position. Player positioning is covered in more detail in the  <Link to="/Rules/CoverPositioning#Positioning"> Cover &amp; Positioning </Link> chapter.
        </p>
        <p>
            Characters also exert control over their surrounding hexes, known as their "Zone of Control". A character's zone of control is a 1 hex radius around their current hex unless otherwise specified. Anyone passing through a character's Zone of Control has to expend twice as much movement as normal to pass at that character's discretion. You don't have to slow your friends down!
        </p>
    </section>
)