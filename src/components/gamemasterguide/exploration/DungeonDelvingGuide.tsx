import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { DungeonDelvingRoomDetailsList, DungeonRoomTable } from "../../rules/figures/GuideDungeonDelvingFigures";
import { Link } from "react-router-dom";

export const DungeonDelvingGuideLink = new ArticleNavLink({
    name: "Dungeon Delving",
    path: "#DungeonDelving"
})

const DungeonDelvingGuide = () => (
    <section id={DungeonDelvingGuideLink.path}>
        <h2>{DungeonDelvingGuideLink.name}</h2>
        <p>
            Before reading this guide, be sure to read the <Link to="/Rules/CallToAdventure#DungeonDelving">rules chapter on dungeon delving</Link> first! This chapter will help you generate dungeons for your players to explore when they leave the wilds of the wasteland. Below is a table for generating rooms in your dungeon when appropriate:
        </p>
        <DungeonRoomTable />
        <DungeonDelvingRoomDetailsList />
    </section>
)