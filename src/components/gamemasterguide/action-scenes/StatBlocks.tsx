import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Enemy } from "../../../entities/library/enemies/Enemy";
import { StatBlock } from "../../../entities/library/enemies/StatBlock";
import { Link } from "react-router-dom";

export const StatBlocksGuideLink = new ArticleNavLink({
    name: "Stat Blocks",
    path: "#StatBlocks",
    render: () => <StatBlocksGuide />
});

const ExampleEnemy: Enemy = {
    id: '0',
    name: 'Cyber Wolf',
    description: 'Vicious and relentless, cyberwolves are a fairly common danger to travelers in the wastes.',
    level: 2,
    health: 22,
    healthScale: 5,
    armor: 1,
    resilience: 1,
    empowerment: 1,
    movement: 7,
    tags: ['Beast', 'Robot'],
    activeAbilities: [
        {
            id: '1',
            name: "Bite",
            description: "The cyberwolf bites with its large fangs.",
            type: 'Attack',
            abilityType: 'ActiveAbility',
            cost: 'None',
            range: 1,
            juices: false,
            dejuices: false,
            skillsUsed: [],
            damageSuite: [
                {
                    quantity: 5,
                    damageType: 'Percussive'
                }
            ],
            customDamageTexts: [],
            tags: []
        },
        {
            id: '2',
            name: "Dogpile",
            description: "The cyberwolf dogpiles on the target, dealing 2 additional kinetic damage for each cyberwolf adjacent to the target.",
            type: 'Attack',
            abilityType: 'ActiveAbility',
            cost: 'None',
            range: 1,
            juices: false,
            dejuices: false,
            skillsUsed: [],
            damageSuite: [
                {
                    quantity: 3,
                    damageType: 'Percussive'
                }
            ],
            customDamageTexts: [],
            tags: []
        },
        {
            id: '3',
            name: "Leap",
            description: "The cyberwolf leaps to a target up to 3 hexes away and can immediately use its bite on it.",
            type: 'Attack',
            abilityType: 'ActiveAbility',
            cost: 'Small',
            range: 3,
            juices: false,
            dejuices: false,
            skillsUsed: [],
            damageSuite: [],
            customDamageTexts: [],
            tags: []
        },
        {
            id: '4',
            name: "Laser",
            description: "The cyberwolf uses its laser to blast an enemy.",
            type: 'Attack',
            abilityType: 'ActiveAbility',
            cost: 'Big',
            range: 6,
            juices: false,
            dejuices: false,
            skillsUsed: [],
            damageSuite: [
                {
                    quantity: 5,
                    damageType: 'Electromagnetic'
                }
            ],
            customDamageTexts: [],
            tags: []
        }
    ],
    commonActiveAbilities: [],
    reactiveAbilities: [],
    commonReactiveAbilities: [],
    passiveAbilities: [],
    commonPassiveAbilities: []
}

const StatBlocksGuide = () => (
    <section id={StatBlocksGuideLink.hash}>
        <h2>{StatBlocksGuideLink.name}</h2>
        <p>
            Before you start controlling enemies, what is an enemy? In game terms, enemies can be identified by <em>Stat Blocks</em> which explain what an enemy is capable of. Below is an example of a <em>Stat Block</em>:
        </p>
        <figure>
            <StatBlock enemy={ExampleEnemy} />
            <figcaption>
                An example stat block for a cyberwolf.
            </figcaption>
        </figure>
        <p>
            As you can see, enemies share many similar traits with player characters. You'll notice the following important bits on the stat block:
        </p>
        <ul>
            <li>The enemy's name.</li>
            <li>The enemy's base difficulty level*.</li>
            <li>The enemy's creature types.</li>
            <li>A description of the enemy.</li>
            <li>The enemy's health.</li>
            <li>The enemy's base health.</li>
            <li>The enemy's health when scaled up to higher levels.*</li>
            <li>The enemy's movement.</li>
            <li>The enemy's armor.</li>
            <li>The enemy's resilience.</li>
            <li>The enemy's empowerment rating.*</li>
        </ul>
        <p>
            <em>* Level, health scaling, and empowerment are covered below.</em>
        </p>
        
        <h3>Level & Difficulty</h3>
        <p>
            An enemy's level indicates about how difficult it is at a base line. Using an enemy's <em>level</em> to generate action scene encounters of certain difficulties is covered in greater detail in the chapter on <Link to="/Guide/CreatingActionScenes">Creating Action Scenes</Link>.
        </p>
        
        <h3>Health Scaling</h3>
        <p>
            When you increase an enemy's level to boost its difficulty, its health scaling indicates how much health you should increase the enemy's health by for each level you increase.
        </p>
        
        <h3>Empowerment</h3>
        <p>
            Similar to players, enemies can be empowered too. That is covered later in this chapter, but an enemy's empowerment bonus indicates how much you should increase the enemy's damage by on an attack when their attack die is empowered.
        </p>

        <h3>Enemies In Combat</h3>
        <p>
            When controlling enemies as GM, you can split their movement and actions in any order you please.
        </p>
    </section>
)