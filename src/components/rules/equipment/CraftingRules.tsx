import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example, GMNote } from "../../directives/Directives";

export const CraftingRulesLink = new ArticleNavLink({
    name: 'Crafting',
    path: '#Crafting',
    render: () => <CraftingRules />
});

const CraftingRules = () => (
    <section id={CraftingRulesLink.hash} key={CraftingRulesLink.path}>
        <h2>{CraftingRulesLink.name}</h2>
        <p>
            As your skills improve, you will find yourself more capable of making and maintaining your own equipment. You are able to craft mods that have a skill requirement if you have a skill that matches that requirement and an appropriate level of reagents. Any mod can be crafted over the duration of your next montage scene unless it specifies otherwise. You can only craft an item if you have access to the reagents needed to manufacture it.
        </p>
        <p>
            The reagents required to craft an item depend on the type of item you want to craft. Electronics items require an equivalently leveled set of electronics reagents and likewise for each skill. You'll find reagents as part of your adventure either as loot from ancient dungeons or plundered from your enemies. You can find reagents for a specific skill, or your GM may provide with you with generic reagents which can be used to craft any item of an appropriate level. If an item does not have a specified level requirement, then assume its level is 2 for the purposes of crafting.
        </p>
        <Example>
            Chelle finds a set of level 4 electronics reagents in a bandit stash. During the next montage, Chelle can craft any electronics item whose level is not greater than either her electronics skill or the level of the reagents (4).
        </Example>
        <Example>
            Chelle finds a set of level 4 reagents in a bandit stash. During the next montage, Chelle can craft any mod whose level is not greater than either her level in that skill or the level of the reagents (4).
        </Example>
        <GMNote>
            Don't be too much of a curmudgeon with crafting! Limiting the reagents available to your players to specific skills can be useful to prevent them from having access to too many different mods too soon, but it's also good to give them the freedom to choose to play how they like. Generally, unless it causes problems, provide each of your players with enough loot to be distributed freely, and use specific reagents when you need to give them a bit more of a challenge.
        </GMNote>
    </section>
)