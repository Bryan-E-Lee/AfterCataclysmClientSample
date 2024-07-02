import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { DiceBoonsPerLevelTable } from "../../rules/figures/DiceBoonFigures";
import { ComplicationsTable, EnemyEmpowermentTable } from "../../rules/figures/GuideCombatFigures";

export const RollingForEnemiesGuideLink = new ArticleNavLink({
    name: "Rolling For Enemies",
    path: "#RollingForEnemies",
    render: () => <RollingForEnemiesGuide />
})

const RollingForEnemiesGuide = () => (
    <section id={RollingForEnemiesGuideLink.hash}>
        <h2>{RollingForEnemiesGuideLink.name}</h2>
        <p>
            Similar to players, enemies take their turns simultaneously, so it is entirely up to you as the GM to determine what actions the enemies take and in what order they take them. Unlike with players though, all of the enemies will use the same roll to determine what actions they can take and what complications can arise during that round of combat.
        </p>
        <p>
            To determine the dice boons you can use on the roll, you can use the following table based on the median (most common) level amongst your players, also known as the <em>Party Level</em>, seen below:
        </p>
        <DiceBoonsPerLevelTable leveledName="Party Level" />

        <h3>Complications</h3>
        <p>
            Based on your roll, you will gain access to different complications that can occur for your players. Complications are listed on an enemy stat block or event block. Complications can only be used once, and they are lost at the end of the round whether or not they were used. There are three types of complications in order from least impactful to more impactful:
        </p>
        <ul>
            <li>Minor</li>
            <li>Major</li>
            <li>Legendary</li>
        </ul>
        <p>
            You can always use a more impactful complication in place of a less impactful one when available. Below you will find the number and type of complications available to you based on your GM roll:
        </p>
        <ComplicationsTable />

        <h3>Individual Rolls</h3>
        <p>
            To introduce some variance into the damage enemies deal, you can also roll a single d6 when performing an action with an enemy to determine if that action is empowered or not. The table below indicates when a roll causes an enemy's action to be empowered or disempowered:
        </p>
        <EnemyEmpowermentTable />
        <p>
            When empowering an enemy attack, you use the empowerment bonus on its stat block. An empowered attack deals additional damage equal to the enemy's empowerment, an unempowered attack deals normal damage, and a disempowered attack deals 1 less damage than normal.
        </p>
    </section>
)