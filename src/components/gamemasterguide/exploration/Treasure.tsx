import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { ChipValueByLevelTable } from "../../rules/figures/GuideTreasureFigures";

export const TreasureGuideLink = new ArticleNavLink({
    name: "Treasure",
    path: "#Treasure",
    render: () => <AccessToItemsGuide />
})

const AccessToItemsGuide = () => (
    <section id={TreasureGuideLink.hash}>
        <h2>{TreasureGuideLink.name}</h2>
        <p>
            Knowing when to hand out loot is important to pacing the adventures you create. This chapter will describe how many chips and gear to make accessible to your players.
        </p>
        <h3>Chip Availability</h3>
        <p>
            You can use the table below to determine the total value of items and chips available to your players:
        </p>
        <ChipValueByLevelTable />
        <p>
            The table above is just a guideline. If you find your players have a little more or less than the total chip value for their level, it's not the end of the world. You'll also need to take into account other factors such as what sort of feeling you want your players to have when receiving loot and the amount of effort they've put into acquiring things.
        </p>
    </section>
)