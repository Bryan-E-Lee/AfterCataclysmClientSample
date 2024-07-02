import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Example, GMNote, PlayerNote, Variant } from '../../directives/Directives';
import { TheCataclysm } from '../../theming/texts';

export const TerminologyRulesLink = new ArticleNavLink({
    name: 'Terminology',
    path: '#Terminology',
    render: () => <TerminologyRules />
});

const TerminologyRules: React.FC = () => (
    <section id={TerminologyRulesLink.hash} key={TerminologyRulesLink.path}>
        <h2>{TerminologyRulesLink.name}</h2>
        <p>
            The following terms will be used frequently throughout this document as a shorthand for general gameplay concepts. Different ideas will be covered in other sections of the rules.
        </p>
        <ul>
            <li>
                <strong>GM:</strong> The Game Master. The GM is responsible for creating the world and making rulings on what can or cannot occur in the wasteland when the rules do not provide guidance. Additionally, the GM may decide to override the rules of the game if it better suits the storyline or adventure.
            </li>
            <li>
                <strong>Character:</strong> Any person or creature with some level of autonomy in the world. This includes all of the player characters and, additionally, persons and creatures portrayed by the GM. It excludes objects such as hammers and vehicles.
            </li>
            <li>
                <strong>PC:</strong> Any character whose behavior is controlled by one of the players.
            </li>
            <li>
                <strong>NPC:</strong> Any character whose behavior is controlled by the GM.
            </li>
            <li>
                <strong>Party:</strong> The entire group of player characters.
            </li>
            <li>
                <strong>Object:</strong> Anything in the world which is not a character such as a shovel or a concrete wall.
            </li>
            <li>
                <strong>Session:</strong> The portion of time spent playing the game, without long breaks in play. There is typically only one session during a real life day, and there may be several days in between sessions depending on how frequently you and your friends decide to play.
            </li>
            <li>
                <strong>Adventure:</strong> A storyline managed by the GM that the players experience. An adventure spans one or more sessions.
            </li>
            <li>
                <strong>d6:</strong> A standard six-sided die.
            </li>
            <li>
                <strong>dX:</strong> An X-sided die. Besides six-sided dice, there are several other dice common in roleplaying games: d4 (4-sided dice), d8 (8-sided dice), etc. These dice are completely optional, but you may find them handy if you want to use some of the random tables in this rulebook. If you don't have a die of the specified type, any method for randomly selecting a number on that die with equal probability will work just fine.
            </li>
            <li>
                <strong>DC:</strong> Stands for "Difficulty Check". When performing a reflex roll, you want to roll greater than or equal to the indicated number. For example, "DC 4" means that you are trying to roll a 4 or higher.
            </li>
            <li>
                <strong>Dice Boon:</strong> A benefit to your rolls in the form of either the ability to reroll a die or to roll an extra die.
            </li>
            <li>
                <strong>Chips:</strong> With no central authority to establish a monetary system, the wasteland has multiple currencies all maintained by their respective polities. 500 years after <TheCataclysm />, "chips" have become the commonplace term to refer to a sum of currency, and all prices are converted into chips for the purposes of gameplay. GMs can dictate actual exchange rates between currencies if such a feature is needed to progress the game's plot.
            </li>
            <li>
                <strong>Hex:</strong> A hex is the standard unit of space in 500 A.C. A hex is a hexagon with a 1 meter radius or a 2 meter diameter (1 yard and 2 yards in imperial units). Units of distance and area are often described in hexes rather than typical units of measure such as kilometers and miles.
            </li>
        </ul>

        <p>
            Throughout this document, you will also see these sections to indicate recommendations for player or ideas for alternative playstyles:
        </p>

        <GMNote>
            This text denotes that there is a recommendation for the GM about how to handle a mechanic.
        </GMNote>

        <PlayerNote>
            This text denotes that there is a hint or consideration for a player to take into account.
        </PlayerNote>

        <Variant>
            This text offers a suggestion for an alternative playstyle or rule.
        </Variant>

        <Example>
            This text shows an example of something explained in an article.
        </Example>
    </section>
);
