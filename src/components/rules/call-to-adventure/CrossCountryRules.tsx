import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";
import { Die } from "../../figures/Die";

export const CrossCountryRulesLink = new ArticleNavLink({
    name: "Going Cross Country",
    path: "#CrossCountry",
    render: () => <CrossCountryRules />
});

const CrossCountryRules = () => (
    <section id={CrossCountryRulesLink.hash}>
        <h2>{CrossCountryRulesLink.name}</h2>
        <p>
            You'll frequently find yourself needing to cross dangerous terrain to get to a destination. There are special rules for managing your expeditions through the wilderness known as traveling <em>Cross Country</em>.
        </p>
        <p>
            When traveling Cross Country, you'll be traveling in a montage: time will be handled loosely and you will explain what your character does more than roleplay it out. When traveling in this form, your party will move across a map of hexes representing about 12 kilometers / 7 miles each. These hexes also represents different types of terrain of the GM's choice. While the specifics of what the terrain looks like are up to your GM, there are a few categories of terrain you'll encounter:
        </p>
        <dl>
            <dt>Open Terrain</dt>
            <dd>
                <em>Open Terrain</em> is easy to cross but also easy to be spotted in. Crossing open terrain costs 1 movement per hex.
            </dd>

            <Example>
                A grassland or savannah is fairly easy to cross but it's also easy for your enemies to follow.
            </Example>

            <dt>Rough Terrain</dt>
            <dd>
                <em>Rough Terrain</em> is hard to cross but typically easier to hide in. Crossing rough terrain costs 2 or more movement per hex, as determined by the GM.
            </dd>

            <Example>
                A dense forest would count as rough terrain. Without a machete, travel can be difficult.
            </Example>
            
            <dt>Obstructed Terrain</dt>
            <dd><em>Obstructed Terrain</em> is impassable without a character's competence or another special ability.</dd>

            <Example>
                A mountain range would be impassable for most parties. A character with a competence in Rock Climbing might be able to grant them some ability to pass through the mountains.
            </Example>
        </dl>

        <p>
            A party traveling on foot has 6 hexes of cross country movement. The party can also travel at haste, increasing their movement to 8 hexes, but at the cost of more dangerous complications occuring. Traveling across road and open terrain costs 1 hex of movement while crossing rough terrain costs 2 hexes of movement. If crossing obstructed terrain via some special ability, it costs 4 hexes of movement to cross.
        </p>
        <p>
            You'll also come across towns and other settlements on your travels. Entering a hex with a settlement will take you out of Cross Country and into the settlement, where roleplaying continues as before.
        </p>
        <p>
            While traveling Cross Country, the party can also elect to move at an accelerated pace, if electing to travel quick, the group starts the day with an additional hex of movement but the probability of danger will increase significantly. Typically, it will make sense to move at an accelerated pace when time is important: either you are racing to get somewhere or fleeing from a pursuer. Outside of these scenarios, it will usually be more worthwhile to travel at a regular pace.
        </p>
        <p>
            When the party enters a hex or camps out overnight Cross Country, the GM will roll a die. Based on the terrain type, the area you are traveling through, and special factors determined by the GM, the result of the die will determine if anything special happens. When this happens, a rolled <Die>1</Die> indicates you'll have to deal with a major complication and the GM will roll another die to determine what happens next! Depending on what the outcome is, your character's competencies may be able to mitigate the problems. On a <Die>2</Die> or <Die>3</Die>, a minor complication occurs and your party will have to either solve the problem using your competencies and gear or simply endure the problem. On a <Die>4</Die> or <Die>5</Die>, nothing out of the ordinary occurs. On a <Die>6</Die>, something beneficial will happen.
        </p>

        <Example>
            A big complication might mean bandits have come across your camp at night or a big storm rumbles overhead. A small complication might be a tree falling and damaging some of your supplies. A beneficial event might be friendly goblin traders coming by with wares and supplies to sell.
        </Example>

        <h3>Party Morale</h3>
        <p>
            Keeping in good spirits will make traveling easier. Unfortunately, that's not always possible with the stress of travel. There are three different levels of morale the party can be in:

            <dl>
                <dt>Good Spirits</dt>
                <dd>
                    Being in <em>Good Spirits</em> means the party is optimistic about what lies ahead; you venture into the unknown confident that you'll be able to handle whatever is in your way. When the party is in Good Spirits, once per scene, characters in the party may give themselves advantage on a challenge or action scene roll. Parties are in good spirits whenever they leave a settlement well supplied and rested.
                </dd>

                <dt>Average Spirits</dt>
                <dd>
                    Being in <em>Average Spirits</em> means the party is about neutral with regards to the challenges they'll face in the future.
                </dd>

                <dt>Poor Spirits</dt>
                <dd>
                    Being in <em>Poor Spirits</em> means the party feels as though their travels will not be good or actively harmful. When the Party is in Poor Spirits, they have disadvantage on the first challenge or action scene roll they perform each scene.
                </dd>
            </dl>
        </p>

        <p>
            Depending on the weather and other events that occur on your journey, the party's morale can improve or worsen. You'll want to always be prepared to keep yourselves feeling optimistic about what's to come!
        </p>
    </section>
)